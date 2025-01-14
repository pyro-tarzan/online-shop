import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const res = NextResponse.json({
        status: 200,
        message: "Logged out successfully."
    });

    res.cookies.set("auth_token", "",{
        maxAge: 0,
        path: "/",
    });
    return res;
}