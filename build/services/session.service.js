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
exports.reissueAccesToken = exports.updateSession = exports.findSession = exports.createSession = void 0;
const session_model_1 = __importDefault(require("../models/session.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const user_service_1 = require("./user.service");
function createSession(userID, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield session_model_1.default.create({ user: userID, userAgent: userAgent });
        return session.toJSON();
    });
}
exports.createSession = createSession;
function findSession(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessions = yield session_model_1.default.find(query).lean();
        return sessions;
    });
}
exports.findSession = findSession;
function updateSession(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.updateOne(query, update);
    });
}
exports.updateSession = updateSession;
function reissueAccesToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded, valid } = (0, jwt_utils_1.verifyJWT)(refreshToken);
        if (!decoded || !(0, lodash_1.get)(decoded, '_id')) {
            return false;
        }
        const session = yield session_model_1.default.findById((0, lodash_1.get)(decoded, 'session'));
        console.log((session === null || session === void 0 ? void 0 : session.user) + "ahha");
        if (!session || !session.valid) {
            return false;
        }
        const user = yield (0, user_service_1.findUser)(session.user);
        //const user = await UserModel.findOne(session.user).lean();
        console.log(user);
        if (!user) {
            return false;
        }
        // create an access token
        const accessTokenTtl = process.env.ACCESSTOKENTTL;
        const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: accessTokenTtl, });
        return accessToken;
    });
}
exports.reissueAccesToken = reissueAccesToken;
