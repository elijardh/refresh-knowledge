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
exports.createUserHandler = void 0;
//lodash proviedes method for omiting data in a response
const lodash_1 = require("lodash");
//create service is the final layer that handles the user creation
const user_service_1 = require("../services/user.service");
//error handling
const mongoose_1 = require("mongoose");
// this is the controller that handles the userCreation
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("started");
            const user = yield (0, user_service_1.createUserService)(req.body);
            return res.send((0, lodash_1.omit)(user.toJSON(), "password"));
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose_1.Error.ValidationError) {
                const messages = Object.values(error.errors).map((err) => err.message);
                return res.status(400).json({
                    success: false,
                    message: 'Could not create user due to some invalid fields!',
                    error: messages,
                });
            }
            return res.status(409).send({ "error": error.message });
        }
    });
}
exports.createUserHandler = createUserHandler;
