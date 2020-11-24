"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const ConnectionsModel_1 = tslib_1.__importDefault(require("../../Models/ConnectionsModel"));
const Connections_type_1 = require("../typeDefs/Connections.type");
const User_type_1 = require("../typeDefs/User.type");
let ConnectionsResolver = class ConnectionsResolver {
    async addConnection(connectionName, connectAuto, notify, clientId, { userId }) {
        const newConnection = await ConnectionsModel_1.default.build({
            clientId,
            connectAuto,
            notify,
            password: '',
            username: '',
            connectionName,
            UserId: userId,
        });
        try {
            await newConnection.save();
            return {
                error: false,
            };
        }
        catch (e) {
            return {
                message: 'Hubo un error',
                error: true,
            };
        }
    }
    async getConnections({ userId }) {
        return await ConnectionsModel_1.default.findAll({
            where: {
                UserId: userId,
            },
        });
    }
};
tslib_1.__decorate([
    type_graphql_1.Mutation(() => User_type_1.Message),
    tslib_1.__param(0, type_graphql_1.Arg('connectionName')),
    tslib_1.__param(1, type_graphql_1.Arg('connectAuto')),
    tslib_1.__param(2, type_graphql_1.Arg('notify')),
    tslib_1.__param(3, type_graphql_1.Arg('clientId')),
    tslib_1.__param(4, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, Boolean, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConnectionsResolver.prototype, "addConnection", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => [Connections_type_1.ConnectionType]),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConnectionsResolver.prototype, "getConnections", null);
ConnectionsResolver = tslib_1.__decorate([
    type_graphql_1.Resolver()
], ConnectionsResolver);
exports.default = ConnectionsResolver;
