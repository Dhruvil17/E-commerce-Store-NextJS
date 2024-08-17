"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import CartContext from "../../utils/CartContext";

const Checkout = () => {
    const [notificationVisible, setNotificationVisible] = useState(false);
    const {
        cartItems,
        emptyCartItems,
        discount,
        discountedPrice,
        setDiscount,
        setDiscountedPrice,
    } = useContext(CartContext);

    const totalPrice = cartItems
        .map((cartItem) => cartItem.price * cartItem.quantity)
        .reduce((acc, curr) => acc + curr, 0);

    const router = useRouter();

    const handleCheckout = async () => {
        try {
            const response = await axios.delete("/api/users/checkout");

            if (response.status === 200) {
                setDiscount(0);
                setDiscountedPrice(0);
                emptyCartItems();

                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 1500);
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                console.error("Failed to clear cart:", response.data.error);
            }
        } catch (error) {
            console.error("Error in handleCheckout:", error);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-6 sm:px-6 md:px-10">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Shipping Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="address"
                            className="block text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="w-full rounded-lg border py-2 px-3"
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="city"
                            className="block text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            className="w-full rounded-lg border py-2 px-3"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="state"
                                className="block text-gray-700 mb-1">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="zip"
                                className="block text-gray-700 mb-1">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                id="zip"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Payment Information
                    </h2>
                    <div className="mt-4">
                        <label
                            htmlFor="card_number"
                            className="block text-gray-700 mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="card_number"
                            className="w-full rounded-lg border py-2 px-3"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                htmlFor="exp_date"
                                className="block text-gray-700  mb-1">
                                Expiration Date
                            </label>
                            <input
                                type="text"
                                id="exp_date"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="cvv"
                                className="block text-gray-700 mb-1">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                className="w-full rounded-lg border py-2 px-3"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl mt-6 font-semibold text-gray-700 mb-4">
                        Order Summary
                    </h2>
                </div>
                <div className="mt-6">
                    <p className="flex justify-between mb-[4%]">
                        <span>Subtotal:</span>
                        <span>₹ {totalPrice.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between mb-[4%]">
                        <span>Discount:</span>
                        <span>₹ {discount.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-xl font-bold mb-[4%]">
                        <span>Total:</span>
                        <span>
                            ₹
                            {discount === 0
                                ? totalPrice.toFixed(2)
                                : discountedPrice.toFixed(2)}
                        </span>
                    </p>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white rounded-md p-2 w-full mt-4"
                        onClick={handleCheckout}>
                        Place Order
                    </button>
                </div>
            </div>
            {notificationVisible && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 p-4 bg-green-600 text-white rounded-lg transition-transform duration-300 translate-y-0">
                    Success! Your Checkout is Complete!
                </div>
            )}
        </div>
    );
};

export default Checkout;
