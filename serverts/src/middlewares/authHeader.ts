import {Request, Response, NextFunction} from 'express';
import boom, {Boom} from '@hapi/boom';
import { verifyToken } from '../utilities/jwtUtilities';


export function authHandle(rolesIn:string[]){
    return (req:Request, res:Response, next:NextFunction)=>{
        const {authorization} = req.headers;
        if(!authorization || !authorization.startsWith("Bearer ")){
            next(boom.unauthorized("No tienes permiso para esto"));
        }else{
            const token = authorization.replace("Bearer ", "");
            authToken(token, rolesIn, req, next);
        }
    }
}

function authToken(token:string, rolesIn:string[], req:Request, next:NextFunction){
    const data = verifyToken(token);
    if(!data){
        next(boom.unauthorized("No tienes permiso para esto"));
    }else{
        const roles = data.authorities.map(a => a.authority.replace("ROLE_",""));
        const check = compareRoles(roles, rolesIn);
        if(check){
            req.headers.username = data.username;
            next();
        }else{
            next(boom.unauthorized("No tienes permiso para esto"))
        }
    }
}

function compareRoles(roles:string[], rolesIn:string[]):boolean{
    for(let i of roles){
        
        if(rolesIn.includes(i)){
            return true;
        }
    }
    return false;
}