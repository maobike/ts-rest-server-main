import { Request, Response } from 'express';
import Item from '../models/item';
import itemSchema from '../schemas/items';


export const getItems = async( req: Request , res: Response ) => {

    const items = await Item.findAll();

    res.json({ items });
}

export const getItem = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const item = await Item.findByPk( id );

    if( item ) {
        res.json(item);
    } else {
        res.status(404).json({
            msg: `No existe un item con el id ${ id }`
        });
    }
}

export const postItem = async( req: Request , res: Response ) => {

    const { body } = req;

    try {
        
        // Validate the request body using Joi's schema
        const { error } = itemSchema.validate(body);
        if (error) {
            // If there is a validation error, it returns a 400 error with the following error message
            return res.status(400).json({ message: error.details[0].message });
        }

        const item = Item.build(body);
        await item.save();

        res.json(item);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
}
