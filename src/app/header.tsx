"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react"

export default Header

function Header() {
    let session = useSession()
    let userId = session?.data?.user?.id

    return (
        <div className="flex justify-between items-center p-2 mb-4 bg-gray-50">
            <div >
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" width="50" height="50" alt="logo" />
                    CrossBid
                </Link>
            </div>
            <div className="flex items-center gap-4">
                {
                    session.data && userId
                    ? (
                        <>
                            <Link href="/auctions/create">
                                Create Auction
                            </Link>
                            <Link href="/auctions">
                                My Auctions
                            </Link>
                            <div>|</div>
                            <div className="flex items-center gap-2">
                                <Image
                                    className="rounded-lg" 
                                    src={session?.data?.user?.image}
                                    alt={session?.data?.user?.name}
                                    height="32"
                                    width="32"
                                />
                                <span className="text-sm">
                                    {session?.data?.user?.name}
                                </span>
                            </div>
                            <Button onClick={() => signOut({ callbackUrl: "/" })}>
                                sign out
                            </Button>
                        </>
                    )
                    : (
                        <Button
                            type="submit"
                            onClick={() => signIn()}
                        >
                            sign in
                        </Button>
                    )
                }
            </div>
        </div>
    )
}