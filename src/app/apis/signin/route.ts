import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/app/lib/types";
import { query } from "@/app/lib/db";

export async function POST(req: NextRequest) {
    const { email, password}: FormData = await req.json();
    if (email && password) {
        try{
            const { rows } = await query("SELECT email FROM users WHERE email=$1;", [email]);
            if ( rows.length > 0 ) {
                return NextResponse.json({message: "success"});
            } else {
                return NextResponse.json({message: "user not exist"});
            }
        } catch (error) {
            return NextResponse.json({Error: "Error occured while connecting to database."});
        }
    }   
}