"use client";

import { createContext } from "react";

const CartContext = createContext({
    cartItems: [],
    discount: 0,
    discountedPrice: 0,
});

export default CartContext;
