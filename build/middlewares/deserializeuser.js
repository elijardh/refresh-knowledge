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
exports.deserialUser = void 0;
const lodash_1 = require("lodash");
const session_service_1 = require("../services/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const deserialUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accesToken = (0, lodash_1.get)(req, "headers.authorization", "").replace("Bearer ", "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accesToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJWT)(accesToken);
    if (decoded) {
        res.locals.user = decoded;
        console.log(JSON.stringify(res.locals.user));
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = yield (0, session_service_1.reissueAccesToken)(refreshToken.toString());
        console.log(newAccessToken);
        if (typeof newAccessToken == 'string') {
            console.log("token renewed");
            res.setHeader("x-access-token", newAccessToken);
            const { decoded, expired } = (0, jwt_utils_1.verifyJWT)(newAccessToken);
            console.log(JSON.stringify(decoded));
            res.locals.user = decoded;
            const user = res.locals.user;
            console.log(JSON.stringify(user));
            return next();
        }
    }
    return next();
});
exports.deserialUser = deserialUser;
