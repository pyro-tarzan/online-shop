import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const setAuthCookie = (res: NextResponse, userId: string) => {
    const cookie = serialize("auth_token", JSON.stringify({id: userId}), {
        maxAge: 60 * 60,
        httpOnly: true,
        path: "/"
    });

    res.headers.set("Set-Cookie", cookie);
};

export const verifyAuthToken = (token: string) => {
    try{
        const data = JSON.parse(token);

        return data.id;
    } catch(error) {
        console.error("Token verification failed: ", error);
        return null;
    }
};