import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/_lib/session";

export async function middleware(req: NextRequest) {

    const protectedRoutes = "/profile";
    const currentPath = req.nextUrl.pathname;

    if ( currentPath === "/signin" || currentPath === "/signup" ) {
        return NextResponse.next();
    }

    if ( protectedRoutes.startsWith("/profile") ) {
        const cookie = (await cookies()).get("session")?.value;
        const session = await decrypt(cookie);

        if ( !session?.userId && req.nextUrl.pathname.startsWith("/profile")) {
            return NextResponse.redirect(new URL("/signin", req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/signup", "/signin"]
}