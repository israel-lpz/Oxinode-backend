"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesDataType = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let DevicesDataType = class DevicesDataType {
};
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DevicesDataType.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], DevicesDataType.prototype, "data", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Date)
], DevicesDataType.prototype, "createdAt", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], DevicesDataType.prototype, "topic", void 0);
DevicesDataType = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], DevicesDataType);
exports.DevicesDataType = DevicesDataType;
