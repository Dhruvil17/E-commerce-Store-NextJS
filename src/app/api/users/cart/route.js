import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Cart from "../../../../models/cartModel";

export async function GET(request) {
    try {
        // Extract the token from cookies
        const cookieHeader = request.headers.get("cookie") || "";
        if (!cookieHeader) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 200 }
            );
        }

        const token = cookieHeader.split("=")[1] || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 200 }
            );
        }

        const userId = decodedToken.id;

        // Fetch the cart for the user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 200 }
            );
        }

        return NextResponse.json({ cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
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
        const { discount, discountedPrice, items } = await request.json();

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                discount: 0,
                discountedPrice: 0,
                items: [],
            });
        }

        // Create a map for faster lookups
        const updatedItemsMap = new Map();
        items.forEach((newItem) => {
            if (newItem.quantity > 0) {
                updatedItemsMap.set(newItem.id, newItem);
            }
        });

        // Remove items that are not in the updated cart
        cart.items = cart.items.filter((item) => {
            const updatedItem = updatedItemsMap.get(item.id);
            if (updatedItem) {
                // Update quantity if present
                item.quantity = updatedItem.quantity;
                return true;
            }
            // Remove item if not present in updatedItemsMap
            return false;
        });

        // Add new items or update existing ones
        updatedItemsMap.forEach((newItem) => {
            const existingItemIndex = cart.items.findIndex(
                (item) => item.id === newItem.id
            );

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity = newItem.quantity;
            } else {
                cart.items.push(newItem);
            }
        });

        // Update discount and discountedPrice regardless of items length
        cart.discount = discount;
        cart.discountedPrice = discountedPrice;

        await cart.save();

        return NextResponse.json({ cart }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/users/cart:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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
        const { id } = await request.json(); // Extract item ID from request

        // Find the cart for the user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 200 }
            );
        }

        // Remove the item from the cart
        cart.items = cart.items.filter((item) => item.id !== id);

        cart.discount = 0;
        cart.discountedPrice = 0;

        await cart.save();

        return NextResponse.json(
            { message: "Item removed from cart successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in DELETE /api/users/cart:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
