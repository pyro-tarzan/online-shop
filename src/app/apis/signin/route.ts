import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/app/lib/types";

export async function POST(req: NextRequest) {
    const { email, password}: FormData = await req.json();
    if (email && password) {
        return NextResponse.json({message: "Data Received successfully."});
    }   
}