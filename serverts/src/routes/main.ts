import { Express, Router } from 'express';
import { usuarioRoutes } from './usuariosRoutes';
import { UserController } from '../controllers/UserController';
import { imageRoutse } from './imagenesRoutes';
import { comentsRouter } from './comentariosRoutes';
import { joiHandle } from '../middlewares/joiHandle';
import { loginSchema } from '../middlewares/schemasjoi/userSchema';

const mainRoute = Router();

const controller = new UserController();

export function createApi(app: Express) {
    app.post('/login', joiHandle(loginSchema, 'body'), controller.login);
    app.use('/api', mainRoute);
    mainRoute.use('/user', usuarioRoutes);
    mainRoute.use('/image', imageRoutse);
    mainRoute.use('/coment', comentsRouter)
}