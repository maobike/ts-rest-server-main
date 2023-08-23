"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('btw', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Mostrar las consultas en consola
});
exports.default = db;
//# sourceMappingURL=connection.js.map