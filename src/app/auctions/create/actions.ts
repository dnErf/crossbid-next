"use server";

import { redirect } from "next/navigation"
import { database } from "@/db/database"
import { auctions } from "@/db/schema"
import { getImageUrlFromBucket, putObjectToMinio } from "@/lib/minio"
import { auth } from "@/auth"

export async function createAuctionAction(fd:FormData) {
    let session = await auth()

    if (!session) {
        throw new Error("unauthorized")
    }

    if (!session.user || !session.user.id) {
        throw new Error("unauthorized")
    }

    let name = fd.get('name') as string
    let endDate = fd.get('endDate') as string
    let startingPrice = parseInt(fd.get('startingPrice') as string)
    let startingPriceInCents = Math.floor(startingPrice * 100)
    let pic = fd.get('image') as File
    let arrBuf = await pic.arrayBuffer()
    let { etag } = await putObjectToMinio(Buffer.from(arrBuf), pic.size, pic.name, pic.type)
    
    if (!etag.length) {
        throw new Error("wenks")
    }

    let presignedUrl = await getImageUrlFromBucket(pic.name)
    console.log(presignedUrl)

    await database.insert(auctions).values({
        userId: session.user.id,
        name: name,
        pic: `${pic.name}`,
        currentBid: startingPriceInCents,
        startingPriceInCents: startingPriceInCents,
        endDate: new Date(endDate)
    })

    redirect("/")
}