import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import CartContext from "../utils/CartContext";

const CartSummary = () => {
    const [notificationVisible, setNotificationVisible] = useState(false);

    const {
        cartItems,
        discount,
        setDiscount,
        discountedPrice,
        setDiscountedPrice,
    } = useContext(CartContext);

    const updateCartWithDiscount = async (newDiscount, newDiscountedPrice) => {
        try {
            await axios.post("/api/users/cart", {
                items: cartItems,
                discount: newDiscount,
                discountedPrice: newDiscountedPrice,
            });
        } catch (error) {
            console.error("Error updating cart with discount:", error);
        }
    };

    const totalPrice = cartItems
        .map((cartItem) => cartItem.price * cartItem.quantity)
        .reduce((acc, curr) => acc + curr, 0);

    const router = useRouter();

    const handleClick = () => {
        router.push("/checkout");
    };

    const handleDiscountCodeFix15 = () => {
        if (totalPrice >= 200) {
            const newDiscount = 15;
            const newDiscountedPrice = totalPrice - newDiscount;
            setDiscount(15);
            setDiscountedPrice(totalPrice - 15);
            updateCartWithDiscount(newDiscount, newDiscountedPrice);
        } else {
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 1500);
        }
    };

    const handleDiscountCodeFix40 = () => {
        if (totalPrice >= 500) {
            const newDiscount = 40;
            const newDiscountedPrice = totalPrice - newDiscount;
            setDiscount(40);
            setDiscountedPrice(totalPrice - 40);
            updateCartWithDiscount(newDiscount, newDiscountedPrice);
        } else {
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 1500);
        }
    };

    const handleDiscountCodePercentage10 = () => {
        if (totalPrice >= 1000) {
            const newDiscount = 0.1 * totalPrice;
            const newDiscountedPrice = totalPrice - newDiscount;
            setDiscount(0.1 * totalPrice);
            setDiscountedPrice(totalPrice - 0.1 * totalPrice);
            updateCartWithDiscount(newDiscount, newDiscountedPrice);
        } else {
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 1500);
        }
    };

    const handleDiscountCodePercentage12 = () => {
        if (totalPrice >= 1500) {
            const newDiscount = 0.12 * totalPrice;
            const newDiscountedPrice = totalPrice - newDiscount;
            setDiscount(0.12 * totalPrice);
            setDiscountedPrice(totalPrice - 0.12 * totalPrice);
            updateCartWithDiscount(newDiscount, newDiscountedPrice);
        } else {
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 1500);
        }
    };

    return (
        <div className="sm:w-1/2 xl:w-2/5 bg-white mx-6 sm:mx-0 sm:mr-[4%] xl:mr-[8.5%] cursor-pointer shadow-lg my-4 p-6 border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-200">
            <div>
                <h2 className="text-xl text-center font-bold mb-[6%]">
                    Cart Summary
                </h2>
                <p className="flex justify-between mb-[4%]">
                    <span>Subtotal:</span>
                    <span>₹ {totalPrice.toFixed(2)}</span>
                </p>
                <p className="flex justify-between mb-[4%]">
                    <span>Discount:</span>
                    <span>₹ {discount.toFixed(2)}</span>
                </p>
                <p className="flex justify-between font-bold mb-[4%]">
                    <span>Total:</span>
                    <span>
                        ₹
                        {discount === 0
                            ? totalPrice.toFixed(2)
                            : discountedPrice.toFixed(2)}
                    </span>
                </p>
            </div>
            <div>
                <h2 className="text-xl text-center font-bold mb-[6%]">
                    Best coupons for you
                </h2>
                <p className="flex justify-between mb-[4%]">
                    <span className="mt-1">Flat ₹15 off (On ₹200 or more)</span>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white w-1/4 rounded-md p-2"
                        onClick={handleDiscountCodeFix15}>
                        Apply
                    </button>
                </p>
                <p className="flex justify-between mb-[4%]">
                    <span className="mt-1">Flat ₹40 off (On ₹500 or more)</span>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white w-1/4 rounded-md p-2"
                        onClick={handleDiscountCodeFix40}>
                        Apply
                    </button>
                </p>
                <p className="flex justify-between mb-[4%]">
                    <span className="mt-1">Get 10% off (On ₹1000 or more)</span>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white w-1/4 rounded-md p-2"
                        onClick={handleDiscountCodePercentage10}>
                        Apply
                    </button>
                </p>
                <p className="flex justify-between mb-[4%]">
                    <span className="mt-1">Get 12% off (On ₹1500 or more)</span>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white w-1/4 rounded-md p-2"
                        onClick={handleDiscountCodePercentage12}>
                        Apply
                    </button>
                </p>
            </div>
            <button
                className="bg-green-600 hover:bg-green-700 text-white rounded-md p-2 w-full mt-4"
                onClick={handleClick}>
                Checkout
            </button>
            {notificationVisible && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-1/2 p-4 bg-yellow-500 text-white rounded-lg transition-transform duration-300 translate-y-0">
                    Add more items to avail this offer!
                </div>
            )}
        </div>
    );
};

export default CartSummary;
