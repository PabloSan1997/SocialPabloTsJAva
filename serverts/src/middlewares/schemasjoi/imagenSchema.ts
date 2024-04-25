import joi from 'joi';


export const imagenSchema = joi.object({
    description:joi.string().min(1).max(280).required(),
    urlImage:joi.string().min(1).max(5000).required()
});