import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPass = process.env.DB_PASS
const dbDriver = process.env.DB_DRIVER as Dialect

const db = new Sequelize(dbName, dbUser, dbPass, 
        {
            host: dbHost,
            dialect: dbDriver,
            logging: console.log, // Mostrar las consultas en consola
        }
    );

export default db;
