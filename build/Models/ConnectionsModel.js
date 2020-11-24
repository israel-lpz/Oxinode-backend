"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const UserModel_1 = tslib_1.__importDefault(require("./UserModel"));
class ConnectionsModel extends sequelize_1.Model {
}
ConnectionsModel.init({
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
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    clientId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    connectAuto: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    connectionName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    notify: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    timestamps: false,
    sequelize: configDB_1.default,
    modelName: 'connection',
    tableName: 'connection',
    freezeTableName: true,
});
UserModel_1.default.hasMany(ConnectionsModel, {
    onDelete: 'cascade',
});
exports.default = ConnectionsModel;
