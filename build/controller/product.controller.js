"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.getProductHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const product_services_1 = require("../services/product.services");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const body = req.body;
            const product = yield (0, product_services_1.createProduct)(Object.assign(Object.assign({}, body), { user: userId }));
            return res.send(product);
        }
        catch (error) {
            return res.status(409).send(error.message);
        }
    });
}
exports.createProductHandler = createProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const productID = req.params.productId;
            const update = req.body;
            const product = yield (0, product_services_1.findProduct)({ productID });
            if (!product) {
                return res.sendStatus(404);
            }
            if (product.user != userId) {
                return res.sendStatus(403);
            }
            const updatedProduct = yield (0, product_services_1.findandUpdate)({ productID }, update, { new: true });
            return res.send(updatedProduct);
        }
        catch (error) {
            res.status(409).send(error.message);
        }
    });
}
exports.updateProductHandler = updateProductHandler;
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("started");
            const productID = req.params.productId;
            console.log("pass 1");
            const product = yield (0, product_services_1.findProduct)({ productID });
            console.log("pass 2");
            if (!product) {
                return res.sendStatus(404);
            }
            console.log("pass 3");
            return res.send(product);
        }
        catch (error) {
            res.status(404).send(error.messsage);
        }
    });
}
exports.getProductHandler = getProductHandler;
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const productID = req.params.productId;
            const product = yield (0, product_services_1.findProduct)({ productID });
            if (!product) {
                return res.sendStatus(404);
            }
            if (product.user != userId) {
                return res.sendStatus(403);
            }
            yield (0, product_services_1.deleteProduct)({ productID });
            res.send({ "message": "Product Deleted" });
        }
        catch (error) {
            res.status(409).send(error.message);
        }
    });
}
exports.deleteProductHandler = deleteProductHandler;
