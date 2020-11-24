import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
	database: 'mqtt',
	host: 'peru-iot4.com',
	dialect: 'mysql',
	password: 'prueba123',
	// username: 'admin_bd',
	username: 'oxinode',
	port: 3306,
});

export default sequelize;
