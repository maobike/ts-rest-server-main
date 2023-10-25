import { DataTypes, Model , Optional} from 'sequelize';
import sequelizeConnection from '../db/connection'

export interface UserAttributes {
    id:        number;
    name:      string;
    email:     string;
    password:  string;
    phone:     string;
    status:    boolean;
}
export interface UserInput extends Optional<UserAttributes, 'id' | 'status'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public phone!: string
    public status!: boolean
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true, // Habilita la gestión automática de createdAt y updatedAt    
    sequelize: sequelizeConnection, // Instancia de Sequelize
    modelName: 'User', // Nombre del modelo
});

export default User;