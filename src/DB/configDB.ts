import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize({
	database: '',
	host: '',
	dialect: 'mysql',
	password: '',
	// username: 'admin_bd',
	username: '',
	port: 3306,
});

export default sequelize;
