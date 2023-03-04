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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.validatePassword = exports.createUserService = void 0;
const lodash_1 = require("lodash");
const mongoose_1 = require("mongoose");
//model or model schema used to represent the user
const user_model_1 = __importDefault(require("../models/user.model"));
function createUserService(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.create(inputs);
        }
        catch (error) {
            throw new mongoose_1.Error(error);
        }
    });
}
exports.createUserService = createUserService;
function validatePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return false;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid) {
            return false;
        }
        else {
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
    });
}
exports.validatePassword = validatePassword;
function findUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.default.findById(id).lean();
        console.log((user === null || user === void 0 ? void 0 : user.name) + "jaja");
        return user;
    });
}
exports.findUser = findUser;
