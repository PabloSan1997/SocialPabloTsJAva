
import {sign, verify} from 'jsonwebtoken';
import { envVariables } from './envVariables';


export function createToken(object:PreTakenObject){
    
    const authorities = JSON.stringify(object.authorities);
    const objectToken:TokenObject = {
        ...object,
        sub:object.username,
        authorities
    }
    const token = sign(objectToken, envVariables.key, {expiresIn:'24h'});
    return token;
}

export function verifyToken(token:string):PreTakenObject|null{
    try {
        const datos = verify(token, envVariables.key) as TokenObject;
        const authorities:{authority:string}[] = JSON.parse(datos.authorities);
        const response:PreTakenObject = {
            ...datos,
            authorities
        }
        return response;
    } catch (error) {
        return null;
    }
}