"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInput = exports.UserType = exports.UserCreateInput = exports.Message = exports.User = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
let User = class User {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "isSuperuser", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "salt", void 0);
User = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
let Message = class Message {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], Message.prototype, "error", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "message", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: true, defaultValue: null }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "token", void 0);
Message = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], Message);
exports.Message = Message;
let UserCreateInput = class UserCreateInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserCreateInput.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserCreateInput.prototype, "lastname", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserCreateInput.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserCreateInput.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserCreateInput.prototype, "direction", void 0);
UserCreateInput = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], UserCreateInput);
exports.UserCreateInput = UserCreateInput;
let UserType = class UserType {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "lastname", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "urlPhoto", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "lastLogin", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserType.prototype, "direction", void 0);
UserType = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], UserType);
exports.UserType = UserType;
let UserInput = class UserInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "lastname", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "oldPassword", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], UserInput.prototype, "direction", void 0);
UserInput = tslib_1.__decorate([
    type_graphql_1.ArgsType()
], UserInput);
exports.UserInput = UserInput;
