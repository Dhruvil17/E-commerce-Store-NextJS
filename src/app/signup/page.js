"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [serverError, setServerError] = useState("");

    const router = useRouter();

    const handleUser = (e) => {
        setUser({
            ...user,
            username: e.target.value,
        });
        if (e.target.value === "") {
            setErrors({ ...errors, username: "" });
        }
    };

    const handleEmail = (e) => {
        setUser({
            ...user,
            email: e.target.value,
        });
        if (e.target.value === "") {
            setErrors({ ...errors, email: "" });
        }
    };

    const handlePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value,
        });
        if (e.target.value === "") {
            setErrors({ ...errors, password: "" });
        }
    };

    // Validate form inputs
    const validate = () => {
        let isValid = true;
        const newErrors = {
            username: "",
            email: "",
            password: "",
        };

        // Username validation
        if (!user.username) {
            newErrors.username = "Username is required.";
            isValid = false;
        } else if (user.username.length < 6) {
            newErrors.username = "Username must be at least 6 characters.";
            isValid = false;
        } else if (!/^[A-Za-z][A-Za-z0-9_]{5,29}$/.test(user.username)) {
            newErrors.username =
                "Username is valid. Please enter a valid username";
            isValid = false;
        }

        if (!user.email) {
            // Email validation
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Please enter a valid Email ID.";
            isValid = false;
        }

        // Password validation
        if (!user.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (user.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
            isValid = false;
        } else if (
            !(user.password.charAt(0) >= "A" && user.password.charAt(0) <= "Z")
        ) {
            newErrors.password =
                "Password must start with an uppercase letter.";
            isValid = false;
        } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                user.password
            )
        ) {
            newErrors.password =
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSignup = async (event) => {
        event.preventDefault();

        // Validate before making API request
        if (!validate()) return;

        try {
            await axios.post("/api/users/signup", user);
            router.push("/signin");
        } catch (error) {
            if (error.response?.data?.error) {
                setServerError(error.response.data.error);
            } else {
                setServerError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center px-6 mx-auto md:h-screen lg:py-24">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={onSignup}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={user.username}
                                    onChange={handleUser}
                                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                                        errors.username ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.username}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleEmail}
                                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handlePassword}
                                    id="password"
                                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            {serverError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {serverError}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="bg-blue-700 hover:bg-blue-800 text-white rounded-md p-2 w-full mt-4">
                                Create an account
                            </button>
                            <p className="text-sm font-light">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    className="font-medium text-primary-600 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
