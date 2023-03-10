"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Passowrd too short -minimum is 6"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Passowrd too short -minimum is 6"),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not valid email"),
    }).refine((data) => data.password == data.passwordConfirmation, { message: "Passwords do not match", path: ['passwordConfirmation'] }),
});
