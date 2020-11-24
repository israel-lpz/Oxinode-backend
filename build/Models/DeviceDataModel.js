"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const DevicesModel_1 = tslib_1.__importDefault(require("./DevicesModel"));
class DeviceDataModel extends sequelize_1.Model {
}
DeviceDataModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    data: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        set(val) {
            this.setDataValue('createdAt', moment_1.default.utc(val).toDate());
        },
    },
}, {
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'Records',
    modelName: 'Records',
    sequelize: configDB_1.default,
    createdAt: true,
    updatedAt: false,
});
DevicesModel_1.default.hasMany(DeviceDataModel, {
    onDelete: 'cascade',
});
DeviceDataModel.belongsTo(DevicesModel_1.default);
exports.default = DeviceDataModel;
