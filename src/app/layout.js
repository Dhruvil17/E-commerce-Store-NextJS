"use client";

import "./globals.css";
import axios from "axios";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import CartContext from "../utils/CartContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    let debounceTimer;

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/users/cart");
                setCartItems(response.data?.cart?.items || []);
                setDiscount(response.data?.cart?.discount || 0);
                setDiscountedPrice(response.data?.cart?.discountedPrice || 0);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const saveCartToDatabase = async (cartItems) => {
        try {
            await axios.post("/api/users/cart", {
                discount: 0,
                discountedPrice: 0,
                items: cartItems,
            });
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    const incrementItem = (item) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );

            if (!prevItems.some((cartItem) => cartItem.id === item.id)) {
                updatedItems.push({ ...item, quantity: 1 });
            }

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                saveCartToDatabase(updatedItems);
            }, 1000);

            return updatedItems;
        });
    };

    const decrementItem = (item) => {
        setCartItems((prevItems) => {
            let updatedItems;

            const existingItem = prevItems.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem && existingItem.quantity > 1) {
                updatedItems = prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            } else {
                updatedItems = prevItems.filter(
                    (cartItem) => cartItem.id !== item.id
                );
            }

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                saveCartToDatabase(updatedItems);
            }, 1000);

            return updatedItems;
        });
    };

    const removeItem = (item) => {
        setCartItems((prevItems) =>
            prevItems.filter((cartItem) => cartItem.id !== item.id)
        );
    };

    const emptyCartItems = () => {
        setCartItems([]);
    };

    return (
        <html lang="en">
            <body className={inter.className}>
                <CartContext.Provider
                    value={{
                        cartItems,
                        incrementItem,
                        decrementItem,
                        removeItem,
                        emptyCartItems,
                        discount,
                        setDiscount,
                        discountedPrice,
                        setDiscountedPrice,
                    }}>
                    <Header />
                    {children}
                </CartContext.Provider>
            </body>
        </html>
    );
}
