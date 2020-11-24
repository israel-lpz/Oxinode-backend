"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const configDB_1 = tslib_1.__importDefault(require("../DB/configDB"));
const UserModel_1 = tslib_1.__importDefault(require("./UserModel"));
class MqttAcl extends sequelize_1.Model {
}
MqttAcl.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    allow: {
        type: sequelize_1.DataTypes.INTEGER({ length: 1 }),
        allowNull: true,
        defaultValue: 1,
        comment: '0: Deny, 1: Allow',
    },
    ipaddr: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: true,
        defaultValue: null,
        comment: 'ipAdress',
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: true,
        comment: 'Username',
    },
    clientid: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: 'Client ID',
        unique: true,
    },
    access: {
        type: sequelize_1.DataTypes.INTEGER({ length: 2 }),
        allowNull: false,
        comment: '1: Subscribe, 2: Publish, 3: Pubsub',
    },
    topic: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: 'Topic Filter',
        unique: true,
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'mqtt_acl',
    modelName: 'mqttAcl',
    sequelize: configDB_1.default,
});
UserModel_1.default.hasOne(MqttAcl, {
    onDelete: 'cascade',
    as: 'mqtt_acl',
});
MqttAcl.belongsTo(UserModel_1.default, {});
exports.default = MqttAcl;
