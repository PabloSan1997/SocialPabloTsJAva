import {Router} from 'express';
import { UserController } from '../controllers/UserController';
import { authHandle } from '../middlewares/authHeader';
import { joiHandle } from '../middlewares/joiHandle';
import { createUserShema } from '../middlewares/schemasjoi/userSchema';


export const usuarioRoutes = Router();

const controller = new UserController();

usuarioRoutes.post('/register',joiHandle(createUserShema, 'body') ,controller.register);

usuarioRoutes.get('/perfil', authHandle(["USER"]),controller.perfil);

usuarioRoutes.get('/perfil/:username',  authHandle(["USER"]),controller.perfilFriend);

usuarioRoutes.delete('/',authHandle(["USER"]) ,controller.deleteCount);