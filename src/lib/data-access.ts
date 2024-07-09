import { desc, eq } from "drizzle-orm"
import { database } from "@/db/database"
import { auctions, bids } from "@/db/schema"

export const getAuction = async (auctionId: number) => {
    let auction = await database.query.auctions.findFirst({
        where: eq(auctions.id, auctionId)
    })
    return auction
}

export const getBidsForAuction = async (auctionId: number) => {
    let allBids = await database.query.bids.findMany({
        where: eq(bids.auctionId, auctionId),
        orderBy: desc(bids.id),
        with: {
            user: {
                columns: {
                    image: true,
                    name: true,
                }
            }
        }
    })

    return allBids
}
