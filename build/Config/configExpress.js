"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const DeviceData_1 = tslib_1.__importDefault(require("../Routes/DeviceData"));
const User_1 = tslib_1.__importDefault(require("../Routes/User"));
function configExpress(app) {
    app.use(cors_1.default({ origin: '*' }));
    app.use(express_1.default.json());
    app.set('PORT', process.env.PORT || 3000);
    app.use(User_1.default);
    app.use(DeviceData_1.default);
    return app;
}
exports.default = configExpress;
