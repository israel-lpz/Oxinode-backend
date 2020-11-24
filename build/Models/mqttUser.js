"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const UserModel_1 = tslib_1.__importDefault(require("./UserModel"));
class MqttUserModel extends sequelize_1.Model {
}
MqttUserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true,
        defaultValue: null,
    },
    is_superuser: {
        type: sequelize_1.DataTypes.INTEGER({ length: 1 }),
        allowNull: true,
        defaultValue: 0,
    },
    created: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: configDB_1.default,
    modelName: 'mqtt_user',
    tableName: 'mqtt_user',
    freezeTableName: true,
});
UserModel_1.default.hasOne(MqttUserModel, {
    onDelete: 'cascade',
    as: 'mqtt_user',
});
exports.default = MqttUserModel;
