import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Auction } from "@/db/schema"
import { getImageUrl, isBidOver } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AuctionCard({ auction }:{ auction: Auction }) {
    return (
        <div className="border w-72 p-4 rounded-lg space-y-2">
            <div className="flex justify-center">
                <Image 
                    src={getImageUrl(auction.pic)}
                    alt={auction.pic}
                    height={200}
                    width={200}
                />
            </div>
            <h2 className="font-bold">
                {auction.name}
            </h2>
            <p className="text-sm">
                starting price $ { auction.startingPriceInCents / 100 }
            </p>
            <p className="text-sm">
                {
                    isBidOver(auction.endDate)
                    ? ("bidding is over")
                    : (`ends on: ${format(auction.endDate, "eeee M/dd/yy")}`)
                }
            </p>
            <Button asChild>
                <Link href={`/auctions/${auction.id}`}>
                    {
                        isBidOver(auction.endDate)
                        ? ("view bid")
                        : ("place bid")
                    }
                </Link>
            </Button>
        </div>
    )
}
