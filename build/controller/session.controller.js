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
exports.deleteSessionHandler = exports.getUserSessionHandler = exports.createSessionHandler = void 0;
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //validate user passoword
        const user = yield (0, user_service_1.validatePassword)(req.body['email'], req.body['password']);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        //create session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        // create an access token
        const accessTokenTtl = process.env.ACCESSTOKENTTL;
        const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: accessTokenTtl, });
        // create a refresh token
        const refreshTokenTtl = process.env.REFRESHTOKENTTL;
        const refreshtoken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: refreshTokenTtl });
        // return refresh and access token
        return res.send({ refreshtoken, accessToken });
    });
}
exports.createSessionHandler = createSessionHandler;
function getUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = res.locals.user._id;
        console.log(userID);
        const sessions = yield (0, session_service_1.findSession)({ user: userID, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: session }, { valid: false });
        return res.send(({
            accessToken: null,
            refreshToken: null
        }));
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
