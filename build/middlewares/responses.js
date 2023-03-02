"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Responses {
    constructor() {
        this.ok = (status, message, res) => {
            return res.status(status).json({
                status, message
            });
        };
        this.error = (status, message, res) => {
            return res.status(status).json({
                status, message
            });
        };
    }
}
exports.default = Responses;
