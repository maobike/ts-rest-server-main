import { Sequelize } from 'sequelize';


const db = new Sequelize('btw', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Mostrar las consultas en consola
});

export default db;
