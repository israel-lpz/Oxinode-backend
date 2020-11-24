"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const UserModel_1 = tslib_1.__importDefault(require("./UserModel"));
class DevicesModel extends sequelize_1.Model {
}
DevicesModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    info: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    deletedAt: true,
    createdAt: true,
    updatedAt: true,
    sequelize: configDB_1.default,
    modelName: 'Devices',
    tableName: 'Device',
    freezeTableName: true,
    charset: 'utf8',
});
UserModel_1.default.hasMany(DevicesModel, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
exports.default = DevicesModel;
