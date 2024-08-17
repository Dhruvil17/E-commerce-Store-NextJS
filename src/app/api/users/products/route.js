import { NextResponse } from "next/server";
import connect from "../../../../dbConfig/dbConfig";
import Product from "../../../../models/productModel";

connect();

export async function GET(request) {
    try {
        const products = await Product.find();
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { id, image, title, rate, count, price } = reqBody;

        const product = await Product.findOne({ id });
        if (product) {
            return NextResponse.json(
                {
                    error: "Product already exists.",
                },
                { status: 200 }
            );
        }

        const newProduct = new Product({
            id,
            image,
            title,
            rate,
            count,
            price,
        });

        await newProduct.save();

        return NextResponse.json({
            message: "Product saved succesfully",
            success: true,
            newProduct,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
