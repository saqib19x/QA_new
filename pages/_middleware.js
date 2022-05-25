import { NextResponse } from "next/server";
import Cookie from "js-cookie";

export async function middleware(req) {
    const accessCookie = Cookie.get('accessCookie')
    console.log('cookies', Cookie.get('accessCookie'))

    const url = req.url

    if (url.includes('/dashboard')) {
        if (!accessCookie) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`)
        }
    }

    return NextResponse.next()
}