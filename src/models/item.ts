import { DataTypes, Model , Optional} from 'sequelize';
import sequelizeConnection from '../db/connection'

export interface ItemAttributes {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    quantity:    number;
}
export interface ItemInput extends Optional<ItemAttributes, 'id'> {}
export interface UserOutput extends Required<ItemAttributes> {}

class Item extends Model<ItemAttributes, ItemInput> implements ItemAttributes {
    public id!: number
    public name!: string
    public description!: string
    public price!: number
    public quantity!: number
}

Item.init({
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
    },
}, {
    timestamps: true, // Habilita la gestión automática de createdAt y updatedAt    
    sequelize: sequelizeConnection, // Instancia de Sequelize
    modelName: 'Item', // Nombre del modelo
});

export default Item;