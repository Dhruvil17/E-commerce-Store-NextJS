import jwt from "jsonwebtoken";
import Cart from "../../../../models/cartModel";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        // Extract and verify the authentication token from cookies
        const cookieHeader = request.headers.get("cookie") || "";
        if (!cookieHeader) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = cookieHeader.split("=")[1] || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const userId = decodedToken.id;

        // Find the cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 200 }
            );
        }

        // Clear all items from the cart
        cart.items = [];
        cart.discount = 0;
        cart.discountedPrice = 0;

        // Save the updated cart document
        await cart.save();

        return NextResponse.json(
            { message: "Cart cleared successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in DELETE /api/users/clearCart:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
