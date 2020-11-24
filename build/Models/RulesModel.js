"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const UserModel_1 = tslib_1.__importDefault(require("./UserModel"));
class RulesModel extends sequelize_1.Model {
}
RulesModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comparison: {
        type: sequelize_1.DataTypes.ENUM('<=', '>='),
        allowNull: false,
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: configDB_1.default,
    createdAt: true,
    modelName: 'RulesModel',
    tableName: 'Rule',
    freezeTableName: true,
    updatedAt: false,
});
UserModel_1.default.hasMany(RulesModel, {
    onDelete: 'cascade',
});
RulesModel.belongsTo(UserModel_1.default);
exports.default = RulesModel;
