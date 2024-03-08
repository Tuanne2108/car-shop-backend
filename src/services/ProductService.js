const Product = require("../models/ProductModel");

let createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, discount, description } =
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
                discount,
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
let getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            if (filter) {
                const type = filter[0];
                const string = filter[1];
                const filteredProduct = await Product.find({
                    [type]: { '$regex': string },
                });
                resolve({
                    status: "OK",
                    message: "Successfully",
                    data: filteredProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            if (sort) {
                const sortedObjects = {};
                sortedObjects[sort[1]] = sort[0];
                const sortedProduct = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(sortedObjects);
                resolve({
                    status: "OK",
                    message: "Successfully",
                    data: sortedProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);
            resolve({
                status: "OK",
                message: "Successfully",
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
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
