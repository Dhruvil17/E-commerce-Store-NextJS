"use client";

import axios from "axios";
import { useContext, useState } from "react";
import CartContext from "../utils/CartContext";

const Card = ({ id, data, showRemoveButton }) => {
    const { image, title, price, rate } = data;

    const [notificationVisible, setNotificationVisible] = useState(false);
    const { cartItems, incrementItem, decrementItem, removeItem, setDiscount } =
        useContext(CartContext);

    const existingItems = cartItems.find((item) => item.id === data.id);
    const quantity = existingItems?.quantity || 0;

    const handleIncrease = () => {
        incrementItem(data);
        setNotificationVisible(true);
        setTimeout(() => {
            setNotificationVisible(false);
        }, 1500);
        setDiscount(0);
    };

    const handleDecrease = () => {
        decrementItem(data);
        setDiscount(0);
    };

    const removeItemFromCart = async () => {
        try {
            const response = await axios.delete("/api/users/cart", {
                data: { id },
            });
            if (response.status === 200) {
                removeItem(data);
                setDiscount(0);
            }
            console.log("Item removed successfully:", response.data);
        } catch (error) {
            console.error(
                "Error removing item from cart:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div
            data-testid="product-card"
            className="bg-white cursor-pointer shadow-lg m-4 p-5 border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex justify-center">
                <img className="h-56 w-auto" src={image} alt="product" />
            </div>
            <h3 className="font-bold my-4">{title}</h3>
            <div className="mt-2 mb-4 flex items-center">
                <svg
                    className="w-4 h-4 text-green-800 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-1 text-gray-900">{rate}</p>
            </div>
            <h4 className="font-bold my-2">₹ {price}</h4>
            <div className="flex items-center mt-4">
                {quantity !== 0 ? (
                    <div>
                        <button
                            onClick={handleDecrease}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-l-lg text-sm px-4 py-2 focus:outline-none">
                            -
                        </button>
                        <span className="mx-4 text-lg font-bold">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-r-lg text-sm px-4 py-2 focus:outline-none">
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleIncrease}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                        Add to Cart
                    </button>
                )}
            </div>
            {showRemoveButton && (
                <button
                    onClick={removeItemFromCart}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm px-5 py-2.5 mt-6">
                    Remove Item
                </button>
            )}
            {notificationVisible && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 p-4 bg-green-600 text-white rounded-lg transition-transform duration-300 translate-y-0">
                    Item added to cart!
                </div>
            )}
        </div>
    );
};

export default Card;
