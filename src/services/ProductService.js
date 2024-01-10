const Product = require("../models/ProductModel");

let createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } =
            newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null)
                resolve({
                    status: "OK",
                    message: "This product is already exist",
                });
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
            });
            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null)
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null)
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            await Product.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete Successfully",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find();
            resolve({
                status: "OK",
                message: "Successfully",
                data: allProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getProductDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productDetails = await Product.findOne({ _id: id });
            if (productDetails === null)
                resolve({
                    status: "OK",
                    message: "The product is not defined",
                });
            resolve({
                status: "OK",
                message: "Successfully",
                data: productDetails,
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductDetails,
};