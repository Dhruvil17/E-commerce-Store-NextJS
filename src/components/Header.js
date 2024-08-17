"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/useAuth";
import { useContext, useState } from "react";
import CartContext from "../utils/CartContext";

const Header = () => {
    const { cartItems } = useContext(CartContext);

    const { isLoggedIn } = useAuth();

    const router = useRouter();

    const totalItems = cartItems
        .map((cartItem) => cartItem.quantity)
        .reduce((acc, curr) => acc + curr, 0);

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 shadow-custom">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="/images/logo.jpg"
                            className="h-12"
                            alt="logo"
                        />
                        <span className="self-center text-xl font-semibold hover:text-blue-700 whitespace-nowrap">
                            SHOPCART
                        </span>
                    </Link>
                    <button
                        onClick={toggleNavbar}
                        type="button"
                        className="inline-flex items-center p-2 w-12 h-12 justify-center text-sm rounded-lg md:hidden focus:outline-none"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}>
                        <span className="sr-only">
                            {isOpen ? "Close main menu" : "Open main menu"}
                        </span>
                        {isOpen ? (
                            // Cross icon for close
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Hamburger icon for open
                            <svg
                                className="w-5 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        )}
                    </button>
                    <div
                        className={`${
                            isOpen ? "" : "hidden"
                        } w-full md:block md:w-auto`}
                        id="navbar-default">
                        <ul className="opacity-85 bg-black text-white md:text-black font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-graydark-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li className="block py-2 px-3 mt-2 rounded md:bg-transparent hover:text-blue-700 md:p-0">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="block py-2 px-3 mt-2 rounded md:bg-transparent hover:text-blue-700 md:p-0">
                                <Link href="/contact">Contact Us</Link>
                            </li>
                            <li className="block py-2 px-3 mt-2 rounded md:bg-transparent hover:text-blue-700 md:p-0">
                                <Link href="/cart">Cart ({totalItems})</Link>
                            </li>
                            {!isLoggedIn ? (
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 focus:outline-none">
                                    <Link href="/signin">SignIn</Link>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 focus:outline-none">
                                    Logout
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
