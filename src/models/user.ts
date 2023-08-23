import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1 // Valor por defecto
    },
}, 
    {
        tableName: 'users',
        timestamps: true // Agregar createdAt y updatedAt automáticamente
    }
);




export default User;