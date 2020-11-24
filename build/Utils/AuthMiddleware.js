"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const isAuth = ({ context }, next) => {
    const { token } = context.req.headers;
    if (!token) {
        throw new Error('Not authenticated');
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.jwt_key || '');
        context.payload = payload;
    }
    catch (err) {
        throw new Error('Not authenticated');
    }
    return next();
};
exports.default = isAuth;
