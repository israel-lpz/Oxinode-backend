"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockets = exports.setServerSocker = exports.addConnection = exports.serverSocket = exports.telegramBots = exports.mqttClientMap = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const DevicesModel_1 = tslib_1.__importDefault(require("../Models/DevicesModel"));
const mqttAcl_1 = tslib_1.__importDefault(require("../Models/mqttAcl"));
const mqttUser_1 = tslib_1.__importDefault(require("../Models/mqttUser"));
const UserModel_1 = tslib_1.__importDefault(require("../Models/UserModel"));
const Utils_1 = require("../Utils/Utils");
exports.mqttClientMap = new Map();
exports.telegramBots = new Map();
exports.addConnection = (id, connection) => {
    exports.mqttClientMap.set(id, connection);
};
exports.setServerSocker = (w) => {
    exports.serverSocket = w;
};
exports.initSockets = (ws) => {
    ws.on('connection', (socket) => {
        console.log(`Socket init`);
        socket.on('login', async (data) => {
            const newData = JSON.parse(data);
            if (newData.token) {
                const { userId } = jsonwebtoken_1.default.decode(newData.token);
                const user = await UserModel_1.default.findOne({
                    where: {
                        id: userId,
                    },
                });
                if (user) {
                    const [mqttUser, mqttAcl] = await Promise.all([
                        mqttUser_1.default.findOne({
                            where: {
                                UserId: user.id,
                            },
                        }),
                        mqttAcl_1.default.findOne({
                            where: {
                                UserId: user.id,
                            },
                        }),
                    ]);
                    Utils_1.initConnectionMQTT({
                        idUser: user.id,
                        ws,
                        topic: mqttAcl.topic || '',
                        password: mqttUser.password_hash || '',
                        username: mqttUser.username || '',
                    });
                    exports.setServerSocker(ws);
                }
            }
        });
        socket.on('addDevice', async (data) => {
            const newData = JSON.parse(data);
            const { userId } = jsonwebtoken_1.default.decode(newData.token);
            const infoJSON = JSON.parse(newData.info);
            const newDevice = DevicesModel_1.default.build({
                UserId: userId,
                info: newData.info,
            });
            await newDevice.save();
            infoJSON.idDB = newDevice.id;
            socket.emit('responseAddDevice', JSON.stringify({
                error: false,
                info: infoJSON,
            }));
        });
    });
};
