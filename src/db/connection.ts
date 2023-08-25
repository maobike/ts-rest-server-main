import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME || 'user_development', 
    process.env.DB_USER || 'postgres', 
    process.env.DB_PASS || 'root', 
        {
            host: process.env.DB_HOST || 'db-postgres',
            dialect: 'postgres',
            logging: console.log, // Mostrar las consultas en consola
        }
    );

export default db;
