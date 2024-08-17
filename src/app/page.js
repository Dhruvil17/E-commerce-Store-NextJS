"use client";

import axios from "axios";
import Card from "../components/Card";
import Shimmer from "../components/Shimmer";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchDataAndSave = async () => {
        try {
            //Fetch the list of products from API
            const data = await fetch("https://fakestoreapi.com/products");
            const products = await data.json();

            //Save each product to database
            for (let product of products) {
                await axios.post("/api/users/products", {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    rate: product.rating.rate,
                    count: product.rating.count,
                    price: product.price,
                });
            }

            const response = await axios.get("/api/users/products");
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error saving products to database:", error.message);
        }
    };

    useEffect(() => {
        fetchDataAndSave();
    }, []);

    return products.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-2 py-[4%] px-[4%] xl:px-[8%]">
            {products.map((product) => (
                <Card
                    key={product.id}
                    data={product}
                    showRemoveButton={false}
                />
            ))}
        </div>
    );
};

export default Products;
