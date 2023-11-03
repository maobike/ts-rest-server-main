import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import { dataUser } from '../interfaces/user';

const secretKey = process.env.SECRET_OR_PRIVATE_KEY as string;

export const validateJWT = async( req: Request , res: Response, next: NextFunction ) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const dataUser  = jwt.verify( token, secretKey ) as dataUser;
        const user = await User.findByPk( dataUser.uid.id );
        
        // Verificar que el usuario exista en la DB
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no valido, err 1' // User not exist in DB
            })
        }

        // Verificar si el estado es true
        if ( !user?.status ) {
            return res.status(401).json({
                msg: 'Token no valido, err 2' // User in status false
            })
        }

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Error de token JWT mal formateado o inválido
            res.status(401).json({ msg: 'Token no valido, err 3' });
        } else {
            console.log(error);
            res.status(401).json({ msg: 'Internal server error' })
        }
    }

}