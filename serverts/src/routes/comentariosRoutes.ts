

import {Router} from 'express';
import { ComentController } from '../controllers/ComentController';
import { authHandle } from '../middlewares/authHeader';
import { joiHandle } from '../middlewares/joiHandle';
import { comentSchema } from '../middlewares/schemasjoi/comentSchema';

export const comentsRouter = Router();
const controller = new ComentController();

comentsRouter.post('/:id',joiHandle(comentSchema, 'body') ,authHandle(["USER"]), controller.addComent);
comentsRouter.delete('/:id', authHandle(["USER"]), controller.deleteComent);