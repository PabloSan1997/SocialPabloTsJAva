import {Request, Response, NextFunction} from 'express';
import { Schema } from 'joi';
import boom from '@hapi/boom';

export function joiHandle(schema:Schema, prop:'params'|'body'){
    return (req:Request, res:Response, next:NextFunction)=>{
        const data = req[prop];
        const {error} = schema.validate(data, {abortEarly:false});
        if(error){
            next(boom.badRequest(error.message));
        }else{
            next();
        }
    }
}