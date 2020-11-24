"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const multer_1 = tslib_1.__importDefault(require("multer"));
const cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const UserModel_1 = tslib_1.__importDefault(require("../Models/UserModel"));
const upload = multer_1.default({
    dest: path_1.default.join(__dirname, '../../temp/'),
});
const userRoutes = express_1.Router();
userRoutes.post('/user/uploadPhoto', upload.single('image'), async (req, res) => {
    const img = req.file;
    try {
        if (img) {
            const imgUpload = await cloudinary_1.default.v2.uploader.upload(img.path);
            fs_1.default.unlink(img.path, () => {
            });
            const { userId } = jsonwebtoken_1.default.decode(req.body.token);
            const user = await UserModel_1.default.findByPk(userId);
            user.urlPhoto = imgUpload.public_id;
            await user.save();
            res.json({ error: false, message: imgUpload.public_id });
        }
        throw new Error();
    }
    catch (e) {
        console.log(e);
        res.json({ error: true, message: 'Hubo un error' });
    }
});
userRoutes.post('/user/isAuth', async (req, res) => {
    const token = req.body.token;
    try {
        const { userId } = (await jsonwebtoken_1.default.decode(token));
        const user = await UserModel_1.default.findByPk(userId);
        if (user) {
            res.json({
                auth: true,
            });
        }
        else {
            throw new Error();
        }
    }
    catch (_a) {
        res.json({
            auth: false,
        });
    }
});
exports.default = userRoutes;
