import { Op } from 'sequelize';
import User from '../models/user';

export const existEmail = async( email: string ) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user;
    } catch (error) {
        console.log(error);
    }
}

export const existEditEmail = async( email: string, id: number ) => {
    try {
        const user = await User.findOne({
            where: {
                email: email,
                id: {
                    [Op.ne]: id,
                },
            }
        });

        return user;
    } catch (error) {
        console.log(error);
    }
}