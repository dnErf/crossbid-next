import { env } from "@/env"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(fileName: string) {
  return `http://${env.NEXT_PUBLIC_MINIO_HOST}:${env.NEXT_PUBLIC_MINIO_PORT}/${env.NEXT_PUBLIC_MINIO_BUCKET_NAME}/${fileName}`
}

export function isBidOver(endDate:Date) {
  return endDate < new Date()
}

export function formatToDollar(cents: number) {
  return `${Math.floor(cents / 100).toFixed(2)}`
}
