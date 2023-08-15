"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string()
        .max(100)
        .required()
        .messages({
        'string.max': 'El nombre no debe tener más de {#limit} caracteres',
        'any.required': 'El nombre es requerido',
    }),
    email: joi_1.default.string()
        .max(100)
        .email()
        .required()
        .messages({
        'string.max': 'El email no debe tener más de {#limit} caracteres',
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es requerido',
    }),
    password: joi_1.default.string()
        .max(100)
        .required()
        .messages({
        'string.max': 'La contraseña no debe tener más de {#limit} caracteres',
        'any.required': 'La contraseña es requerida',
    }),
    phone: joi_1.default.string()
        .max(12)
        .required()
        .messages({
        'string.max': 'El campo teléfono no debe tener más de 12 dígitos.',
        'any.required': 'El teléfono es requerido',
    }),
});
exports.default = userSchema;
//# sourceMappingURL=user.js.map