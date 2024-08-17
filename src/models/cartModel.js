import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    id: {
        type: String,
        ref: "Product",
        required: [true, "Please provide the product ID from API"],
    },
    image: {
        type: String,
        equired: [true, "Please provide the product image"],
    },
    title: {
        type: String,
        required: [true, "Please provide the product title"],
    },
    rate: {
        type: Number,
        required: [true, "Please provide the product rate"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
    },
    price: {
        type: Number,
        required: [true, "Please provide the product price"],
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        required: [true, "Please provide the userId"],
    },
    discount: {
        type: Number,
        required: [true, "Please provide total discount on products"],
    },
    discountedPrice: {
        type: Number,
        required: [
            true,
            "Please provide total price after discount on products",
        ],
    },
    items: [cartItemSchema],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
