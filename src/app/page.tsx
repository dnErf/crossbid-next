import Image from "next/image"
import Link from "next/link"
import { database } from "@/db/database"
import { Auctions } from "@/db/schema"
import { getImageUrl } from "@/lib/utils"
import { AuctionCard } from "@/components/auction-card"

export default async function HomePage() {
    let allAuctions = await database.query.auctions.findMany() as Auctions
    console.log(allAuctions)
    // http://172.20.206.30:9000/dev-bucket/new_group_discord_1.png
    return (
        <section className="p-8">
            <div className="grid grid-cols-6">
                {
                    allAuctions.map((auction) => (
                        <AuctionCard key={auction.id} auction={auction} />
                    ))
                }
            </div>
        </section>
    );
}
