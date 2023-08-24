import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Item = db.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, 
    {
        tableName: 'items',
        timestamps: true // Agregar createdAt y updatedAt automáticamente
    }
);

export default Item;