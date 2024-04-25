import joi from 'joi';


const username = joi.string().min(2).max(50).required();
const nickname = joi.string().min(2).max(50).required();
const password = joi.string().required();
const description = joi.string().min(1).max(280).required();
const perfilImage = joi.string().min(1).max(5000).required();


export const createUserShema = joi.object({
    username,
    nickname,
    password,
    description,
    perfilImage
});


export const loginSchema = joi.object({
    username,
    password
});