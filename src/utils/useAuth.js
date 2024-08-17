"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post("/api/users/verify");
                setIsLoggedIn(response.data.isValid);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        verifyToken();
    }, []);

    return { isLoggedIn };
}
