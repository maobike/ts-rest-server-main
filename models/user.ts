import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Aquí se define como único
        validate: {
          isEmail: true // También puedes agregar validaciones de formato de correo electrónico si lo deseas
        }    
    },
    password: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: DataTypes.BOOLEAN
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 // Valor por defecto
    },
}, 
    {
        timestamps: true // Agregar createdAt y updatedAt automáticamente
    }
);


export default User;