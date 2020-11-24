"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudinary_db_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});
