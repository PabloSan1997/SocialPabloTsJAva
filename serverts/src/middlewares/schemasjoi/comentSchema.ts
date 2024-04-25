import Joi from "joi";


export const comentSchema = Joi.object({
    coment: Joi.string().min(1).max(280).required()
})