import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../../models/userModel";
import connect from "../../../../dbConfig/dbConfig";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                {
                    error: "An account with this Email ID already exists. Please Sign In to your account.",
                },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
