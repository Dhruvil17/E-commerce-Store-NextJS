import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const cookieHeader = request.headers.get("cookie") || "";
        const token = cookieHeader?.split("=")[1] || "";

        if (!token) {
            return NextResponse.json({ isValid: false });
        }

        jwt.verify(token, process.env.TOKEN_SECRET);
        return NextResponse.json({ isValid: true });
    } catch (error) {
        return NextResponse.json({ isValid: false });
    }
}
