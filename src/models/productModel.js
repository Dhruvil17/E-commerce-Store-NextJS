import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, "Please provide a product ID from the API"],
    },
    image: {
        type: String,
        required: [true, "Please provide a product image"],
    },
    title: {
        type: String,
        required: [true, "Please provide a product title"],
    },
    rate: {
        type: Number,
        required: [true, "Please provide a product rating"],
    },
    count: {
        type: Number,
        required: [true, "Please provide a product count"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a product price"],
    },
});

const Product =
    mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
