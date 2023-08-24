import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.max': 'El nombre no debe tener más de {#limit} caracteres',
            'any.required': 'El nombre es requerido',
        }),

    description: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.max': 'La descripción no debe tener más de {#limit} caracteres',
            'any.required': 'La descripción es requerida',
        }),

    price: Joi.number()
        .min(0)
        .max(9999)
        .required()
        .messages({
            'number.max': 'El precio no debe ser mayor de {#limit}',
            'any.required': 'El precio es requerido',
        }),

    quantity: Joi.number()
        .min(0)
        .max(9999)
        .required()
        .messages({
            'number.max': 'La cantidad no debe ser mayor de {#limit}',
            'any.required': 'La cantidad es requerida',
        }),
});

export default userSchema;
