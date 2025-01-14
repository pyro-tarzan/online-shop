import { NextRequest, NextResponse } from "next/server";
import { FormDataTypes } from "@/app/lib/types";
import { query } from "@/app/lib/db";
import { storeHash } from "@/app/lib/encryption";
import { setAuthCookie } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
    const {username, fullname, email, password}: FormDataTypes = await req.json();
    if ( username && email && password && fullname) {
        
        try{
            const userResult = await query("SELECT email FROM users WHERE email=$1;", [email]);
            const users = userResult.rows;

            if ( users.length > 0 ){
                return NextResponse.json({status: 401, message: "User already exist"});
            } else {
                const hashedPassword = await storeHash(password, 10);
                const res = await query("INSERT INTO users (username, full_name, email, password)\
                    VALUES($1, $2, $3, $4) RETURNING user_id;", [username, fullname, email, hashedPassword]);
                const userId = res.rows[0].user_id;
                const response = NextResponse.json({status: 200, message: "User created successfully", user_id: userId});
                setAuthCookie(response, userId);
                return response;
            }
        } catch ( error ) {
            console.log("SignUp API: ", error);
            return NextResponse.json({status: 500, message: "Internal server error."})
        }
    } else {
        return NextResponse.json({status: 400, message: "All fields are required."})
    }
}