"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBotTelegram = exports.initConnectionMQTT = void 0;
const tslib_1 = require("tslib");
const mqtt_1 = tslib_1.__importDefault(require("mqtt"));
const telegraf_1 = require("telegraf");
const configMqtt_1 = require("../Config/configMqtt");
const DeviceDataModel_1 = tslib_1.__importDefault(require("../Models/DeviceDataModel"));
const DevicesModel_1 = tslib_1.__importDefault(require("../Models/DevicesModel"));
const RulesModel_1 = tslib_1.__importDefault(require("../Models/RulesModel"));
const UserModel_1 = tslib_1.__importDefault(require("../Models/UserModel"));
const formatDate_1 = require("./formatDate");
exports.initConnectionMQTT = ({ username, password, topic, ws, idUser, }) => {
    var _a;
    const mqttClient = mqtt_1.default.connect('mqtt://peru-iot4.com', {
        port: 1883,
        host: 'peru-iot4.com',
        clientId: 'access_control_server_' + Math.round(Math.random() * (0 - 10000) * -1),
        username: username,
        password: password,
        keepalive: 60,
        reconnectPeriod: 1000,
        protocol: 'mqtt',
        clean: true,
    });
    mqttClient.on('connect', () => {
        console.log('Conexión  MQTT Exitosa!');
        mqttClient === null || mqttClient === void 0 ? void 0 : mqttClient.subscribe(topic);
    });
    mqttClient.on('message', async (topic, payload) => {
        ws.emit(topic, JSON.stringify({
            data: payload.toString(),
            topic,
        }));
        await DeviceDataModel_1.default.build({
            data: parseInt(payload.toString()),
            topic,
        }).save();
    });
    (_a = configMqtt_1.mqttClientMap.get(idUser)) === null || _a === void 0 ? void 0 : _a.end(true);
    configMqtt_1.mqttClientMap.delete(idUser);
    configMqtt_1.mqttClientMap.set(idUser, mqttClient);
};
exports.initBotTelegram = async (userId, chatId) => {
    var _a;
    const bot = configMqtt_1.telegramBots.get(userId);
    bot.on('callback_query', async (ctx) => {
        var _a;
        const dataInfo = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data;
        if (dataInfo) {
            const device = await DevicesModel_1.default.findByPk(parseInt(dataInfo));
            if (device) {
                const infoDevice = JSON.parse(device === null || device === void 0 ? void 0 : device.info);
                const data = await DeviceDataModel_1.default.findOne({
                    where: {
                        topic: infoDevice.topic,
                    },
                    order: [['createdAt', 'DESC']],
                });
                if (data) {
                    const date = data.createdAt;
                    date.setHours(date.getUTCHours() - 5);
                    await ctx.reply(`El ultimo valor del dispositivo ${infoDevice.panelName} es: ${data.data} con la fecha de ${formatDate_1.formatDate(date)}`);
                }
                else {
                    await ctx.reply(`Topico ${infoDevice.topic} no encontrado`);
                }
            }
            else {
                await ctx.reply('Dispositivo no encontrado');
            }
        }
        else {
            await ctx.reply('Topico no valido');
        }
    });
    bot.command('dispositive', async (ctx) => {
        const devices = await DevicesModel_1.default.findAll({
            where: {
                UserId: userId,
            },
        });
        const options = [];
        for (const device of devices) {
            const info = JSON.parse(device.info);
            if (info.type !== 'graphic') {
                await options.push(telegraf_1.Markup.callbackButton(info.panelName, `${device.id}`));
            }
        }
        await ctx.reply('Dispositivos', telegraf_1.Extra.HTML().markup(telegraf_1.Markup.inlineKeyboard(options)));
    });
    bot.command('chatid', async (ctx) => {
        var _a;
        await ctx.reply(((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id.toString()) || ':v');
    });
    bot.command('direccion', async (ctx) => {
        const user = await UserModel_1.default.findByPk(userId);
        if (user) {
            await ctx.reply(`La direccion es: ${user.direction}`);
        }
        else {
            await ctx.reply('El usuario no existe');
        }
    });
    (_a = configMqtt_1.mqttClientMap.get(userId)) === null || _a === void 0 ? void 0 : _a.addListener('message', async (topic, payload) => {
        const rules = await RulesModel_1.default.findAll({
            where: {
                UserId: userId,
            },
        });
        rules.forEach((rule) => {
            if (rule.state) {
                if (rule.topic === topic) {
                    const value = parseInt(payload.toString());
                    if (rule.comparison === '>=') {
                        if (value >= rule.number) {
                            bot.telegram.sendMessage(chatId, rule.message);
                        }
                    }
                    else if (rule.comparison === '<=') {
                        if (value <= rule.number) {
                            bot.telegram.sendMessage(chatId, rule.message);
                        }
                    }
                }
            }
        });
    });
};
