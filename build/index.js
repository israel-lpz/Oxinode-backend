"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require('dotenv').config();
const configApollo_1 = tslib_1.__importDefault(require("./Config/configApollo"));
const configDB_1 = tslib_1.__importDefault(require("./DB/configDB"));
require("./Config/configCloudinary");
require("./Config/configMqtt");
const configMqtt_1 = require("./Config/configMqtt");
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const https_1 = tslib_1.__importDefault(require("https"));
const http_1 = tslib_1.__importDefault(require("http"));
const fs_1 = tslib_1.__importDefault(require("fs"));
(async () => {
    const server = await configApollo_1.default();
    let NodeServer;
    if (__filename.includes('.ts')) {
        NodeServer = http_1.default.createServer(server);
    }
    else {
        const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/peru-iot4.com/privkey.pem', 'utf8');
        const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/peru-iot4.com/cert.pem', 'utf8');
        const ca = fs_1.default.readFileSync('/etc/letsencrypt/live/peru-iot4.com/chain.pem', 'utf8');
        NodeServer = https_1.default.createServer({
            key: privateKey,
            cert: certificate,
            ca,
        }, server);
    }
    const io = socket_io_1.default(NodeServer, {
        handlePreflightRequest: (_server1, req, res) => {
            res.writeHead(200, {
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Origin': req.headers.origin,
                'Access-Control-Allow-Credentials': 'true',
            });
            res.end();
        },
    });
    configMqtt_1.initSockets(io);
    try {
        await NodeServer.listen(3001);
        console.info(`Server on port ${3001}`);
    }
    catch (error) {
        console.error(error);
    }
    try {
        await configDB_1.default.authenticate({ logging: false });
        await configDB_1.default.sync({ alter: false, logging: false });
        console.info('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
