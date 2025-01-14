import { NextRequest, NextResponse } from "next/server";
import { FormDataTypes } from "@/app/lib/types";
import { query } from "@/app/lib/db";
import { verifyHash } from "@/app/lib/encryption";
import { setAuthCookie } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
    const { email, password}: FormDataTypes = await req.json();
    if (email && password) {
        try{
            const res = await query("SELECT user_id, email, password FROM users WHERE email=$1;", [email]);
            const storedDetails: FormDataTypes = res.rows[0];
            
            if ( storedDetails ) {
                const verify = await verifyHash(password, storedDetails.password);
                if ( storedDetails.email === email && verify) {
                    const response = NextResponse.json({status: 200, message: "Successfully logged in.", user_id: res.rows[0].user_id});
                    setAuthCookie(response, res.rows[0].user_id);
                    return response;
                } else {
                    return NextResponse.json({status: 401, message: "Invalid Email or Password."});
                }
            } else {
                return NextResponse.json({status: 404, message: "user does not exist"});
            }
        } catch (error) {
            console.log("Signin API: ", error);
            return NextResponse.json({status: 500, message: "Internal server error."})
        }
    } else {
        return NextResponse.json({status: 400, message: "All fields are required."})
    }
}