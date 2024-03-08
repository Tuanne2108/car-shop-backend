const productService = require("../services/ProductService");

class ProductController {
    async createProduct(req, res) {
        try {
            const {
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                discount,
                description,
            } = req.body;
            if (
                !name ||
                !image ||
                !type ||
                !price ||
                !countInStock ||
                !rating
            ) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The input is required",
                });
            }
            const response = await productService.createProduct(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const data = req.body;
            if (!productId) {
                return res.status(200).json({
                    status: "FAILURE",
                    message: "The product ID is required",
                });
            }
            const response = await productService.updateProduct(
                productId,
                data
            );
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const response = await productService.deleteProduct(productId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async getAllProduct(req, res) {
        try {
            const { limit, page, sort, filter } = req.query;
            const response = await productService.getAllProduct(
                Number(limit) || 4,
                Number(page) || 0,
                sort,
                filter
            );
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async getProductDetails(req, res) {
        try {
            const productId = req.params.id;
            const response = await productService.getProductDetails(productId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
}

module.exports = new ProductController();
