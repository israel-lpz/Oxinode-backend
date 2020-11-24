"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesType = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let DevicesType = class DevicesType {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], DevicesType.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], DevicesType.prototype, "UserId", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], DevicesType.prototype, "info", void 0);
DevicesType = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], DevicesType);
exports.DevicesType = DevicesType;
