"use server";

import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { database } from "@/db/database"
import { auctions, bids } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createBidAction(auctionId:number) {
    let session = await auth()
    let userId = session?.user?.id

    if (!userId) {
        throw new Error("you must be logged in to place a bid")
    }

    let auction = await database.query.auctions.findFirst({
        where: eq(auctions.id, auctionId)
    })

    if (!auction) {
        throw new Error("auction not found")
    }

    let latestBidValue = auction.currentBid + auction.bidInterval

    await database.insert(bids).values({
        userId,
        auctionId,
        amount: latestBidValue,
        timestamp: new Date(),
    })

    await database.update(auctions)
        .set({ currentBid: latestBidValue })
        .where(eq(auctions.id, auctionId))

    revalidatePath(`/auctions/${auctionId}`)
}
