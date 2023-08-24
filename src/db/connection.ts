import { Sequelize } from 'sequelize';


const db = new Sequelize('user_development', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log, // Mostrar las consultas en consola
});

export default db;
