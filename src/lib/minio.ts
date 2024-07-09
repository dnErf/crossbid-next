import * as Minio from "minio"
import { env } from "@/env"

const minioClient = new Minio.Client({
  endPoint: '172.20.206.30',
  port: 9000,
  useSSL: false,
  accessKey: env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
  secretKey: env.NEXT_PUBLIC_MINIO_SECRET_KEY,
})

export const putObjectToMinio = async (fileBlob, fileSize, fileName, fileType) => {
    // return await minioClient.fPutObject(env.NEXT_PUBLIC_MINIO_BUCKET_NAME, fileName, filePath, {
    //     'Content-Type': fileType,
    // })

    return await minioClient.putObject(env.NEXT_PUBLIC_MINIO_BUCKET_NAME, fileName, fileBlob, fileSize, {
        'Content-Type': fileType,
    })
}

export const getImageUrlFromBucket = async (fileName) => {
    return await minioClient.presignedUrl('GET', env.NEXT_PUBLIC_MINIO_BUCKET_NAME, fileName) // , 24 * 60 * 60
}
