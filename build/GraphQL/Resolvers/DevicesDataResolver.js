"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const DeviceDataModel_1 = tslib_1.__importDefault(require("../../Models/DeviceDataModel"));
const DevicesDataType_1 = require("../typeDefs/DevicesDataType");
const sequelize_1 = require("sequelize");
const moment_1 = tslib_1.__importDefault(require("moment"));
require("moment/locale/es");
moment_1.default.locale('es');
let DevicesDataResolver = class DevicesDataResolver {
    async getData(topic, year, month, day, hour) {
        const lastDate = new Date();
        lastDate.setUTCFullYear(year);
        lastDate.setUTCMonth(month);
        lastDate.setUTCDate(day);
        lastDate.setUTCHours(hour);
        lastDate.setUTCMinutes(0);
        lastDate.setUTCSeconds(0);
        lastDate.setUTCMilliseconds(0);
        const newDate = new Date();
        newDate.setUTCFullYear(year);
        newDate.setUTCMonth(month);
        newDate.setUTCDate(day);
        newDate.setUTCHours(hour + 1);
        newDate.setUTCMinutes(0);
        newDate.setUTCSeconds(0);
        newDate.setUTCMilliseconds(0);
        return await DeviceDataModel_1.default.findAll({
            where: {
                topic,
                createdAt: {
                    [sequelize_1.Op.between]: [lastDate, newDate],
                },
            },
        });
    }
};
tslib_1.__decorate([
    type_graphql_1.Mutation(() => [DevicesDataType_1.DevicesDataType]),
    tslib_1.__param(0, type_graphql_1.Arg('topic')),
    tslib_1.__param(1, type_graphql_1.Arg('year', () => type_graphql_1.Int)),
    tslib_1.__param(2, type_graphql_1.Arg('month', () => type_graphql_1.Int)),
    tslib_1.__param(3, type_graphql_1.Arg('day', () => type_graphql_1.Int)),
    tslib_1.__param(4, type_graphql_1.Arg('hour', () => type_graphql_1.Int)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DevicesDataResolver.prototype, "getData", null);
DevicesDataResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], DevicesDataResolver);
exports.default = DevicesDataResolver;
