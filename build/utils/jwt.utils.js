"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJWT(object, options) {
    const privatekey = process.env.PRIVATEKEY;
    return jsonwebtoken_1.default.sign(object, privatekey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const publicKey = process.env.PUBLICKEY;
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.verifyJWT = verifyJWT;
