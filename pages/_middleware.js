import { NextResponse } from "next/server";

export async function middleware(req) {
    const { accessCookie } = req.cookies

    const url = req.url

    if (url.includes('/account')) {
        if (!accessCookie) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}login`)
        }
    }

    if (accessCookie) {
        if (url.includes('/login')) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}account`)
        }
    }

    if (accessCookie) {
        if (url === process.env.NEXT_PUBLIC_URL) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}account`)
        }
    }

    return NextResponse.next()
}