"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMessage = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
require("reflect-metadata");
const shortid_1 = tslib_1.__importDefault(require("shortid"));
const type_graphql_1 = require("type-graphql");
const mqttAcl_1 = tslib_1.__importDefault(require("../../Models/mqttAcl"));
const mqttUser_1 = tslib_1.__importDefault(require("../../Models/mqttUser"));
const UserModel_1 = tslib_1.__importDefault(require("../../Models/UserModel"));
const cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
const User_type_1 = require("../typeDefs/User.type");
const graphql_upload_1 = require("graphql-upload");
function returnMessage(error, message, token = null) {
    return {
        error,
        message,
        token,
    };
}
exports.returnMessage = returnMessage;
const generateUserHashMqtt = async () => {
    const hashUser = shortid_1.default.generate();
    const oldUser = await mqttUser_1.default.findOne({
        where: {
            username: hashUser,
        },
    });
    if (!oldUser) {
        return hashUser;
    }
    await generateUserHashMqtt();
};
const generateTopicHashMqtt = async () => {
    const hashTopic = shortid_1.default.generate();
    const oldTopic = await mqttAcl_1.default.findOne({
        where: {
            topic: hashTopic,
        },
    });
    if (!oldTopic) {
        return hashTopic;
    }
    await generateTopicHashMqtt();
};
let UserResolver = class UserResolver {
    async createUser({ password, email, lastname, name, direction }) {
        try {
            const oldUser = await UserModel_1.default.findOne({
                where: {
                    email,
                },
            });
            if (!oldUser) {
                const password_hash = await bcryptjs_1.default.hash(password, 10);
                const newUser = UserModel_1.default.build({
                    email,
                    password: password_hash,
                    lastname,
                    name,
                    direction,
                });
                const transporter = nodemailer_1.default.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'pablitox2698@gmail.com',
                        pass: 'ckj0mchx',
                    },
                });
                const passwordMQTT = shortid_1.default.generate();
                const [userMQTT, topicMQTT] = await Promise.all([
                    generateUserHashMqtt(),
                    generateTopicHashMqtt(),
                ]);
                const mailOptions = {
                    from: 'Peru-IoT4.com',
                    to: email,
                    subject: 'Cuenta',
                    text: `Usuario MQTT: ${userMQTT} \nPassword MQTT ${passwordMQTT} \nTopico Raiz: ${topicMQTT}`,
                };
                const user = await newUser.save();
                await mqttAcl_1.default.build({
                    topic: topicMQTT + '/#',
                    access: 3,
                    username: userMQTT,
                    allow: 1,
                    UserId: user.id,
                }).save();
                await mqttUser_1.default.build({
                    username: userMQTT,
                    password_hash: passwordMQTT,
                    UserId: user.id,
                }).save();
                await transporter.sendMail(mailOptions);
                return returnMessage(false, 'Usuario registrado');
            }
            return returnMessage(true, 'Email ocupado');
        }
        catch (e) {
            return returnMessage(true, e);
        }
    }
    async loginUser(password, email) {
        const user = await UserModel_1.default.findOne({
            where: {
                email,
            },
        });
        if (user !== null) {
            const matchPasswords = await bcryptjs_1.default.compare(password, user.password);
            if (matchPasswords) {
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'xctvybnimlbksdakdaskbsancasc');
                user.lastLogin = Date.now().toString();
                await user.save({
                    fields: ['lastLogin'],
                });
                return returnMessage(false, 'Inicio de sesionxd', token);
            }
            return returnMessage(true, 'Las credenciales estan malxd');
        }
        return returnMessage(true, 'El usuario no existe');
    }
    async getInfoUser({ userId }) {
        return await UserModel_1.default.findOne({
            where: {
                id: userId,
            },
        });
    }
    async updateUser({ name, email, lastname, password, oldPassword, direction }) {
        const user = await UserModel_1.default.findOne({
            where: {
                email,
            },
        });
        if (user) {
            const passwordAreEqual = await bcryptjs_1.default.compare(oldPassword, user.password);
            if (passwordAreEqual) {
                const hashPassword = await bcryptjs_1.default.hash(password, 10);
                user.name = name;
                user.lastname = lastname;
                user.password = hashPassword;
                user.direction = direction;
                await user.save();
            }
            else {
                return returnMessage(true, 'La contraseña no coincide');
            }
        }
        return returnMessage(false, 'Ok');
    }
    async uploadPerfilImage({ userId }, image) {
        const { stream, filename, mimetype, encoding } = await image;
        console.log(stream, filename, mimetype, encoding);
        const user = await UserModel_1.default.findOne({
            where: {
                id: userId,
            },
        });
        if (user) {
            const imgCloudinary = await cloudinary_1.default.v2.uploader.upload(image);
            user.urlPhoto = imgCloudinary.public_id;
            await user.save();
            return returnMessage(false, '');
        }
        return returnMessage(true, 'Ha ocurrido un error');
    }
};
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_type_1.UserCreateInput]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Arg('password')),
    tslib_1.__param(1, type_graphql_1.Arg('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => User_type_1.UserType),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "getInfoUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Args()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [User_type_1.UserInput]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('image', (type) => graphql_upload_1.GraphQLUpload)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof Upload !== "undefined" && Upload) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "uploadPerfilImage", null);
UserResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.default = UserResolver;
