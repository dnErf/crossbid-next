import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { getAuction, getBidsForAuction } from "@/lib/data-access"
import { formatToDollar, getImageUrl, isBidOver } from "@/lib/utils"
import Image from "next/image"
import { createBidAction } from "./actions"
import Link from "next/link"

export default async function AuctionDetailPage({ params }) {
    let auction = await getAuction(parseInt(params.auctionId))

    return !auction 
    ? (
        <div className="flex flex-col gap-4 justify-center items-center bg-gray-50 min-h-96">
            <h2 className="font-bold text-2xl">
                invalid page
            </h2>
            <p className="font-semibold">
                auction is not found. try a different auction item.
            </p>
            <Button asChild className="my-8">
                <Link href={'/'}>
                    view auctions
                </Link>
            </Button>
        </div>
    )
    : (async function(){
        let session = await auth()
        let canPlaceBid = session && (auction.userId !== session.user.id) && !isBidOver(auction.endDate)
        let allBids = await getBidsForAuction(parseInt(params.auctionId))
        let hasBids = allBids.length > 0

        return (
            <section className="flex justify-around">
                {/* auction details */}
                <div className="flex-1 p-8 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            auction for { auction.name }
                        </h2>
                    </div>
                    <div className="flex justify-center bg-gray-50 p-4">
                        <Image 
                            className="rounded-lg"
                            src={ getImageUrl(auction.pic) }
                            alt={auction.pic}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <div>
                            <span className="text-sm">
                                current bid {" "}
                            </span>
                            <span className="font-bold">
                                $ { formatToDollar(auction.currentBid) }
                            </span>
                        </div>
                        <div>
                            <span className="text-sm">
                                starting price of {" "}
                            </span>
                            <span className="font-bold">
                                $ { formatToDollar(auction.startingPriceInCents) }
                            </span>
                        </div>
                        <div>
                            <span className="text-sm">
                                bid interval {" "}
                            </span>
                            <span className="font-bold">
                                $ { formatToDollar(auction.bidInterval) }
                            </span>
                        </div>
                    </div>
                </div>
                {/* all bids */}
                <div className="flex-1 p-8 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            current bids
                        </h2>
                    </div>
                    {
                        hasBids
                        ? (
                            <ul>
                                <li>
                                    <div>
                                        hello
                                    </div>
                                </li>
                            </ul>
                        )
                        : (
                            <div className="min-h-full flex flex-col justify-center items-center gap-8 bg-gray-50">
                                <Image 
                                    src="/package.svg"
                                    width="200"
                                    height="200"
                                    alt="package"
                                />
                                <h2 className="font-bold">
                                    no bids yet
                                </h2>
                                {
                                    canPlaceBid && (
                                        <form action={createBidAction.bind(null, auction.id)}>
                                            <Button>place a bid</Button>
                                        </form>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </section>
        )
    }())
}