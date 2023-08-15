"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // También puedes agregar validaciones de formato de correo electrónico si lo deseas
        }
    },
    password: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Valor por defecto
    },
}, {
    timestamps: true // Agregar createdAt y updatedAt automáticamente
});
exports.default = User;
//# sourceMappingURL=user.js.map