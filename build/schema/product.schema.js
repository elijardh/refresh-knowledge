"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required"
        }),
        description: (0, zod_1.string)({ required_error: "description is required" }),
        price: (0, zod_1.number)({
            required_error: "price is required"
        }),
        image: (0, zod_1.string)({
            required_error: "image is required"
        }),
    })
};
const parama = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.any)({
            required_error: "Product ID is required"
        }),
    })
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), parama));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, parama));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, parama));
