import { Request, Response } from 'express';
import User from '../models/user';
import userSchema from '../schemas/user';
import { existEmail, existEditEmail } from '../functions/user';


export const getUsers = async( req: Request , res: Response ) => {

    const users = await User.findAll();

    res.json({ users });
}

export const getUser = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    if( user ) {
        res.json(user);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }
}

export const postUser = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        
        // Validate the request body using Joi's schema
        const { error } = userSchema.validate(body);
        if (error) {
            // If there is a validation error, it returns a 400 error with the following error message
            return res.status(400).json({ message: error.details[0].message });
        }

        const existEmailUser = await existEmail(body.email);

        if (existEmailUser) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }

        const user = User.build(body);
        await user.save();

        res.json(user);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
}

export const putUser = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        // Validate the request body using Joi's schema
        const { error } = userSchema.validate(body);
        if (error) {
            // If there is a validation error, it returns a 400 error with the following error message
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        const existUser = await existEditEmail(body.email, id);
        
        if( existUser ){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }

        await user.update( body );

        res.json( user );

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
}


export const deleteUser = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await user.update({ status: false });

    // await usuario.destroy();
    res.json(user);
}