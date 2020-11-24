"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    lastLogin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Fecha de ultima sesion',
    },
    urlPhoto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Url de foto de perfil',
    },
    botToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    chatId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    enabledBot: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    direction: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    charset: 'utf8',
    createdAt: true,
    updatedAt: true,
    deletedAt: false,
    modelName: 'User',
    tableName: 'user',
    sequelize: configDB_1.default,
});
exports.default = UserModel;
