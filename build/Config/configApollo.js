"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const Connections_resolver_1 = tslib_1.__importDefault(require("../GraphQL/Resolvers/Connections.resolver"));
const Devices_resolver_1 = tslib_1.__importDefault(require("../GraphQL/Resolvers/Devices.resolver"));
const DevicesDataResolver_1 = tslib_1.__importDefault(require("../GraphQL/Resolvers/DevicesDataResolver"));
const RulesResolver_1 = tslib_1.__importDefault(require("../GraphQL/Resolvers/RulesResolver"));
const User_resolver_1 = tslib_1.__importDefault(require("../GraphQL/Resolvers/User.resolver"));
const configExpress_1 = tslib_1.__importDefault(require("./configExpress"));
async function configApollo() {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [
            User_resolver_1.default,
            Connections_resolver_1.default,
            Devices_resolver_1.default,
            DevicesDataResolver_1.default,
            RulesResolver_1.default,
        ],
    });
    const app = configExpress_1.default(express_1.default());
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: async ({ req, res }) => {
            const token = req.headers.token;
            if (token) {
                const { userId } = await jsonwebtoken_1.default.decode(token);
                return { res, req, userId };
            }
            return { res, req };
        },
    });
    server.applyMiddleware({ app });
    return app;
}
exports.default = configApollo;
