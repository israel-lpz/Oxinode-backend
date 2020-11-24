"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionType = exports.ConnectionsArgs = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ConnectionsArgs = class ConnectionsArgs {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ConnectionsArgs.prototype, "connectionName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConnectionsArgs.prototype, "connectAuto", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConnectionsArgs.prototype, "notify", void 0);
ConnectionsArgs = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], ConnectionsArgs);
exports.ConnectionsArgs = ConnectionsArgs;
let ConnectionType = class ConnectionType {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ConnectionType.prototype, "connectionName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConnectionType.prototype, "connectAuto", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConnectionType.prototype, "notify", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ConnectionType.prototype, "id", void 0);
ConnectionType = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ConnectionType);
exports.ConnectionType = ConnectionType;
