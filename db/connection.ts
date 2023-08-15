import { Sequelize } from 'sequelize';


const db = new Sequelize('btw', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true, // Mostrar las consultas en consola
});

export default db;
