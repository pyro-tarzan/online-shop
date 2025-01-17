import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);

const cookieConfig = {
    name: "session",
    options: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/"},
    duration: 60 * 60 * 1000
}

export async function encrypt(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key)
}

export async function decrypt(session: string | undefined): Promise<JWTPayload | null> {
    try{
        if (! session) return null;
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"]
        });
        return payload;
    } catch (error){
        return null;
    }
}

export async function createSession(userId: string): Promise<void> {
    const expires = new Date(Date.now() + cookieConfig.duration);
    const session = await encrypt({ userId, expires });

    (await cookies()).set(cookieConfig.name, session, { ...cookieConfig.options, expires } as Partial<ResponseCookie>)
    redirect(`/profile/${userId}`);
}

export async function verifySession(): Promise<{ userId: string }> {
    const currentCookie = (await cookies()).get(cookieConfig.name)?.value;
    const session = await decrypt(currentCookie);

    if ( !session?.userId ) {
        redirect("/signin");
    }

    return { userId: session.userId as string }
}

export async function deleteSession(): Promise<void> {
    (await cookies()).delete(cookieConfig.name);
    redirect("/logout");
}