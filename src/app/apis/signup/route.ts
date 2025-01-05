import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/app/lib/types";
import { query } from "@/app/lib/db";

export async function POST(req: NextRequest) {
    const {username, fullname, email, password}: FormData = await req.json();
    if ( username && email && password && fullname) {
        try{
            const check = await query("SELECT email FROM users WHERE email=$1;", [email]);
            if ( check.rows.length > 0 ){
                return NextResponse.json({message: "User already exist"});
            } else {
                const res = await query("INSERT INTO users (username, full_name, email, password)\
                    VALUES($1, $2, $3, $4);", [username, fullname, email, password]);
                console.log(res.rows);
                return NextResponse.json({message: "User created successfully"});
            }
        } catch ( error ) {
            console.log(error);
        }
    }
}