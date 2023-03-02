"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        return res.sendStatus(404);
    }
    return next();
};
exports.default = requireUser;
