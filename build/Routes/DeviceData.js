"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const DeviceDataModel_1 = tslib_1.__importDefault(require("../Models/DeviceDataModel"));
const json2csv_1 = require("json2csv");
const DevicesModel_1 = tslib_1.__importDefault(require("../Models/DevicesModel"));
const formatDate_1 = require("../Utils/formatDate");
const DeviceDataRouter = express_1.Router();
DeviceDataRouter.post('/data/download', async (req, res) => {
    const { id, token, topic } = req.body;
    if (id && token && token) {
        const device = await DevicesModel_1.default.findByPk(id);
        if (device) {
            const { panelName } = JSON.parse(device.info);
            const deviceData = await DeviceDataModel_1.default.findAll({
                where: {
                    topic,
                },
            });
            const data = [];
            deviceData.forEach((dat) => {
                const date = new Date();
                date.setUTCFullYear(dat.createdAt.getUTCFullYear());
                date.setUTCMonth(dat.createdAt.getUTCMonth());
                date.setUTCDate(dat.createdAt.getUTCDate());
                date.setUTCHours(dat.createdAt.getUTCHours() - 5);
                date.setUTCSeconds(dat.createdAt.getUTCSeconds());
                data.push({
                    createdAt: formatDate_1.formatDate(date),
                    data: dat.data,
                });
                console.log(date.toUTCString());
            });
            const json2csv = new json2csv_1.Parser({
                fields: [
                    {
                        label: 'Creado en',
                        value: 'createdAt',
                    },
                    {
                        label: 'data',
                        value: 'data',
                    },
                ],
            });
            const csv = json2csv.parse(data);
            res.header('Content-Type', 'text/csv');
            res.header('name', panelName);
            res.attachment('Data.csv');
            res.send(csv);
        }
        else {
            res.json({
                error: true,
                msg: 'El dispositivo no existe',
            });
        }
    }
    else {
        res.json({
            error: true,
            msg: 'El dispositivo no existe',
        });
    }
});
exports.default = DeviceDataRouter;
