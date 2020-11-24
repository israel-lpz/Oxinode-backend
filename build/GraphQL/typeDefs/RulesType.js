"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesType = exports.RulesInput = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let RulesInput = class RulesInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], RulesInput.prototype, "topic", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => String),
    tslib_1.__metadata("design:type", String)
], RulesInput.prototype, "comparison", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], RulesInput.prototype, "number", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], RulesInput.prototype, "message", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], RulesInput.prototype, "idDB", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], RulesInput.prototype, "state", void 0);
RulesInput = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], RulesInput);
exports.RulesInput = RulesInput;
let RulesType = class RulesType {
};
tslib_1.__decorate([
    type_graphql_1.Field({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], RulesType.prototype, "idDB", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => String),
    tslib_1.__metadata("design:type", String)
], RulesType.prototype, "comparison", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], RulesType.prototype, "number", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], RulesType.prototype, "topic", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], RulesType.prototype, "message", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], RulesType.prototype, "state", void 0);
RulesType = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], RulesType);
exports.RulesType = RulesType;
