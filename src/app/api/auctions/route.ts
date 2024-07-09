import { putObjectToMinio } from "@/lib/minio"
import { database } from "@/db/database"
import { auctions } from "@/db/schema"
import { auth } from "@/auth"

export async function POST(request: Request) {
    let session = await auth()

    if (!session) {
        throw new Error("unauthorized")
    }

    if (!session.user || !session.user.id) {
        throw new Error("unauthorized")
    }

    let fd = await request.formData()
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

    await database.insert(auctions).values({
        userId: session.user.id,
        name: name,
        pic: `${pic.name}`,
        currentBid: startingPriceInCents,
        startingPriceInCents: startingPriceInCents,
        endDate: new Date(endDate)
    })

    return Response.json({ fine:true })
}