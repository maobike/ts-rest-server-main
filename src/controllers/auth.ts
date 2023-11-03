import { Request, Response } from 'express';
import { existEmail } from '../functions/user';
import { generateJWT } from '../functions/auth';
import authSchema from '../schemas/auth';
import * as bcrypt from 'bcryptjs';
import { User } from '../interfaces/user';


export const login = async( req: Request , res: Response ) => {
    const { body } = req;

    try {
        // Validate the request body using Joi's schema
        const { error } = authSchema.validate(body);
        if (error) {
            // If there is a validation error, it returns a 400 error with the following error message
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await existEmail(body.email);

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos' // Email mal'
            });
        }

        // If this user is active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos' //: Estado False'
            })
        }

        // Verify the password
        const validPassword = bcrypt.compareSync( body.password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos' // Password malo'
            })
        }

        // Generate the JWT
        const dataUser: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
        }
        const token = await generateJWT( dataUser );
        res.json({
            dataUser,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
    
}
