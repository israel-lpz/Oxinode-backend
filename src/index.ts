require('dotenv').config();
import { Application } from 'express';
import configApollo from './Config/configApollo';
import sequelize from './DB/configDB';
import './Config/configCloudinary';
import './Config/configMqtt';
import { initSockets } from './Config/configMqtt';
import SocketIO, { Server } from 'socket.io';
import https from 'https';
import http from 'http';
import fs from 'fs';

(async () => {
	const server: Application = await configApollo();
	let NodeServer;
	if (__filename.includes('.ts')) {
		NodeServer = http.createServer(server);
	} else {
		// Certificate
		const privateKey = fs.readFileSync(
			'/etc/letsencrypt/live/peru-iot4.com/privkey.pem',
			'utf8',
		);
		const certificate = fs.readFileSync(
			'/etc/letsencrypt/live/peru-iot4.com/cert.pem',
			'utf8',
		);
		const ca = fs.readFileSync(
			'/etc/letsencrypt/live/peru-iot4.com/chain.pem',
			'utf8',
		);
		NodeServer = https.createServer(
			{
				key: privateKey,
				cert: certificate,
				ca,
			},
			server,
		);
	}

	const io: Server = SocketIO(NodeServer, {
		handlePreflightRequest: (_server1, req, res) => {
			res.writeHead(200, {
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Origin': req.headers.origin,
				'Access-Control-Allow-Credentials': 'true',
			});
			res.end();
		},
	});

	initSockets(io);
	try {
		await NodeServer.listen(3001);
		console.info(`Server on port ${3001}`);
	} catch (error) {
		console.error(error);
	}

	try {
		await sequelize.authenticate({ logging: false });
		await sequelize.sync({ alter: true, logging: false });
		console.info('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();
