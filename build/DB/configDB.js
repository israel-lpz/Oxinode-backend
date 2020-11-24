"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    database: 'mqtt',
    host: 'localhost',
    dialect: 'mysql',
    password: 'prueba123',
    username: 'admin_bd',
    port: 3306,
});
exports.default = sequelize;
