import { putObjectToMinio } from "@/lib/minio"

export async function POST(request: Request) {
    let fd = await request.formData()
    let name = fd.get('name')
    let pic = fd.get('image') as File
    let arrBuf = await pic.arrayBuffer()

    let { etag } = await putObjectToMinio(Buffer.from(arrBuf), pic.size, name, pic.type)

    return Response.json({ etag })
}