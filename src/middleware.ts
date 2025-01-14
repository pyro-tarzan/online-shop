import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken } from "./app/lib/auth";

const isAuthenticated = (req: NextRequest) => {
    const token = req.cookies.get("auth_token");
    return token?.value && verifyAuthToken(token.value);
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if ( pathname === "/signup" || pathname == "/signin" ) {
        return NextResponse.next();
    }

    if ( pathname.startsWith("/profile") ) {
        if ( !isAuthenticated(req) ) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/signup", "/signin"]
}