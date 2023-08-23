import Joi from 'joi';

const userSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.max': 'El nombre no debe tener más de {#limit} caracteres',
            'any.required': 'El nombre es requerido',
        }),

    email: Joi.string()
        .max(100)
        .email()
        .required()
        .messages({
            'string.max': 'El email no debe tener más de {#limit} caracteres',
            'string.email': 'El email debe tener un formato válido',
            'any.required': 'El email es requerido',
        }),

    password: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.max': 'La contraseña no debe tener más de {#limit} caracteres',
            'any.required': 'La contraseña es requerida',
        }),


    phone: Joi.string()
        .max(12)
        .required()
        .messages({
            'string.max': 'El campo teléfono no debe tener más de 12 dígitos.',
            'any.required': 'El teléfono es requerido',
        }),
});

export default userSchema;
