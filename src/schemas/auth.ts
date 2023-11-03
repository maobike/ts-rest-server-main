import Joi from 'joi';

const authSchema = Joi.object({
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
        .messages({
            'string.max': 'La contraseña no debe tener más de {#limit} caracteres',
        }),

});

export default authSchema;
