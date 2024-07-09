import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        NODE_ENV: z.string().min(1),
        DATABASE_URL: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_MINIO_HOST: z.string().min(1),
        NEXT_PUBLIC_MINIO_PORT: z.string().min(1),
        NEXT_PUBLIC_MINIO_ACCESS_KEY: z.string().min(1),
        NEXT_PUBLIC_MINIO_SECRET_KEY: z.string().min(1),
        NEXT_PUBLIC_MINIO_BUCKET_NAME: z.string().min(1),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_MINIO_HOST: process.env.NEXT_PUBLIC_MINIO_HOST,
        NEXT_PUBLIC_MINIO_PORT: process.env.NEXT_PUBLIC_MINIO_PORT,
        NEXT_PUBLIC_MINIO_ACCESS_KEY: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
        NEXT_PUBLIC_MINIO_SECRET_KEY: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
        NEXT_PUBLIC_MINIO_BUCKET_NAME: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME,
    }
})
