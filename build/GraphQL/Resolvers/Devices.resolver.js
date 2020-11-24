"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const DevicesModel_1 = tslib_1.__importDefault(require("../../Models/DevicesModel"));
const Devices_type_1 = require("../typeDefs/Devices.type");
const User_type_1 = require("../typeDefs/User.type");
const User_resolver_1 = require("./User.resolver");
let DevicesResolver = class DevicesResolver {
    async getDevices({ userId }) {
        return await DevicesModel_1.default.findAll({
            where: {
                UserId: userId,
            },
        });
    }
    async editDevice({ userId }, info) {
        const deviceJSON = JSON.parse(info);
        const device = await DevicesModel_1.default.findOne({
            where: {
                id: deviceJSON.idDB,
                UserId: userId,
            },
        });
        try {
            if (device) {
                device.info = info;
                await device.save({
                    fields: ['info'],
                });
            }
            return User_resolver_1.returnMessage(false, 'OK');
        }
        catch (e) {
            return User_resolver_1.returnMessage(true, e);
        }
    }
    async removeDevice({ userId }, id) {
        try {
            await DevicesModel_1.default.destroy({
                where: {
                    UserId: userId,
                    id,
                },
            });
            return User_resolver_1.returnMessage(false, '');
        }
        catch (e) {
            return User_resolver_1.returnMessage(true, e);
        }
    }
};
tslib_1.__decorate([
    type_graphql_1.Query(() => [Devices_type_1.DevicesType]),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DevicesResolver.prototype, "getDevices", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('info')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], DevicesResolver.prototype, "editDevice", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__param(1, type_graphql_1.Arg('idDB')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DevicesResolver.prototype, "removeDevice", null);
DevicesResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], DevicesResolver);
exports.default = DevicesResolver;
