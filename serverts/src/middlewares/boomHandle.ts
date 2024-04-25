
import {Request, Response, NextFunction} from 'express';
import boom, {Boom} from '@hapi/boom';
import { envVariables } from '../utilities/envVariables';


export function boomHandle(error:Boom, req:Request, res:Response, _next:NextFunction){
    if(envVariables.mode_dev && !error.isBoom){
        console.log(error);
    }
    if(error.isBoom){
        const {payload} = error.output;
        res.status(payload.statusCode).json(payload);
    }else{
        const internal = boom.badImplementation();
        const {payload} = internal.output;
        res.status(payload.statusCode).json(payload);
    }
}