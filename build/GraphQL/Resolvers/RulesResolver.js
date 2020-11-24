"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const telegraf_1 = require("telegraf");
const type_graphql_1 = require("type-graphql");
const configMqtt_1 = require("../../Config/configMqtt");
const mqttAcl_1 = tslib_1.__importDefault(require("../../Models/mqttAcl"));
const mqttUser_1 = tslib_1.__importDefault(require("../../Models/mqttUser"));
const RulesModel_1 = tslib_1.__importDefault(require("../../Models/RulesModel"));
const UserModel_1 = tslib_1.__importDefault(require("../../Models/UserModel"));
const Utils_1 = require("../../Utils/Utils");
const RulesType_1 = require("../typeDefs/RulesType");
const User_type_1 = require("../typeDefs/User.type");
const User_resolver_1 = require("./User.resolver");
let RulesResolver = class RulesResolver {
    async addRule(rulesInput, { userId }) {
        try {
            if (rulesInput.idDB) {
                const updateRule = await RulesModel_1.default.findByPk(rulesInput.idDB);
                updateRule.message = rulesInput.message;
                updateRule.comparison = rulesInput.comparison;
                updateRule.number = rulesInput.number;
                updateRule.topic = rulesInput.topic;
                updateRule.state = rulesInput.state;
                await (updateRule === null || updateRule === void 0 ? void 0 : updateRule.save());
                return User_resolver_1.returnMessage(false, updateRule.id.toString());
            }
            else {
                const newRule = await RulesModel_1.default.create({
                    comparison: rulesInput.comparison,
                    number: rulesInput.number,
                    message: rulesInput.message,
                    UserId: userId,
                    topic: rulesInput.topic,
                    state: rulesInput.state,
                });
                return User_resolver_1.returnMessage(false, newRule.id.toString());
            }
        }
        catch (e) {
            return User_resolver_1.returnMessage(false, e);
        }
    }
    async getRules({ userId }) {
        try {
            const rulesModels = await RulesModel_1.default.findAll({
                where: {
                    UserId: userId,
                },
            });
            return rulesModels.map((rule) => ({
                idDB: rule.id,
                topic: rule.topic,
                comparison: rule.comparison,
                number: rule.number,
                message: rule.message,
                state: rule.state,
            }));
        }
        catch (e) {
            return [];
        }
    }
    async deleteRule({ userId }, idDB) {
        await RulesModel_1.default.destroy({
            where: {
                UserId: userId,
                id: idDB,
            },
        });
        return User_resolver_1.returnMessage(false, '');
    }
    async addToken({ userId }, token, chatId) {
        var _a, _b;
        const user = await UserModel_1.default.findByPk(userId);
        if (user) {
            user.botToken = token;
            user.chatId = chatId;
            user.enabledBot = true;
            await user.save();
            const mqttAcl = await mqttAcl_1.default.findOne({
                where: {
                    UserId: userId,
                },
            });
            const mqttUser = await mqttUser_1.default.findOne({
                where: {
                    UserId: userId,
                },
            });
            try {
                configMqtt_1.telegramBots.set(userId, new telegraf_1.Telegraf(token));
                (_a = configMqtt_1.telegramBots.get(userId)) === null || _a === void 0 ? void 0 : _a.launch();
                (_b = configMqtt_1.mqttClientMap.get(userId)) === null || _b === void 0 ? void 0 : _b.removeAllListeners('message');
                Utils_1.initConnectionMQTT({
                    username: mqttUser.username,
                    topic: mqttAcl.topic,
                    password: mqttUser.password_hash,
                    ws: configMqtt_1.serverSocket,
                    idUser: userId,
                });
                await Utils_1.initBotTelegram(user.id, chatId);
            }
            catch (_c) { }
            console.log(chatId);
        }
        return User_resolver_1.returnMessage(false, '');
    }
    async getToken({ userId }) {
        const user = await UserModel_1.default.findByPk(userId);
        if (user) {
            return User_resolver_1.returnMessage(false, JSON.stringify({
                token: user.botToken,
                chatId: user.chatId,
            }));
        }
        return User_resolver_1.returnMessage(true, '{}');
    }
    async toggleEnabledTelegram({ userId }, enabled, token, chatId) {
        var _a, _b;
        const user = await UserModel_1.default.findByPk(userId);
        if (user) {
            user.enabledBot = enabled;
            await user.save();
            const mqttAcl = await mqttAcl_1.default.findOne({
                where: {
                    UserId: userId,
                },
            });
            const mqttUser = await mqttUser_1.default.findOne({
                where: {
                    UserId: userId,
                },
            });
            try {
                if (enabled) {
                    configMqtt_1.telegramBots.set(userId, new telegraf_1.Telegraf(token));
                    (_a = configMqtt_1.telegramBots.get(userId)) === null || _a === void 0 ? void 0 : _a.launch();
                }
                (_b = configMqtt_1.mqttClientMap.get(userId)) === null || _b === void 0 ? void 0 : _b.removeAllListeners('message');
                Utils_1.initConnectionMQTT({
                    username: mqttUser.username,
                    topic: mqttAcl.topic,
                    password: mqttUser.password_hash,
                    ws: configMqtt_1.serverSocket,
                    idUser: userId,
                });
                if (enabled) {
                    await Utils_1.initBotTelegram(user.id, chatId);
                }
            }
            catch (_c) { }
            console.log(chatId);
        }
        return User_resolver_1.returnMessage(false, '');
    }
    async getEnabledTelegram({ userId }) {
        const user = await UserModel_1.default.findByPk(userId);
        return User_resolver_1.returnMessage((user === null || user === void 0 ? void 0 : user.enabledBot) || false, '');
    }
};
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Args()),
    tslib_1.__param(1, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [RulesType_1.RulesInput, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "addRule", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => [RulesType_1.RulesType]),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "getRules", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('idDB', () => type_graphql_1.Int)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "deleteRule", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('token')),
    tslib_1.__param(2, type_graphql_1.Arg('chatId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "addToken", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "getToken", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('enabled')),
    tslib_1.__param(2, type_graphql_1.Arg('token')),
    tslib_1.__param(3, type_graphql_1.Arg('chatId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Boolean, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "toggleEnabledTelegram", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RulesResolver.prototype, "getEnabledTelegram", null);
RulesResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], RulesResolver);
exports.default = RulesResolver;
