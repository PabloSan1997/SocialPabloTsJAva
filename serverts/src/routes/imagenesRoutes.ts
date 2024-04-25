import { Router } from "express";
import { ImageController } from "../controllers/ImageController";
import { authHandle } from "../middlewares/authHeader";
import { joiHandle } from "../middlewares/joiHandle";
import { imagenSchema } from "../middlewares/schemasjoi/imagenSchema";


export const imageRoutse = Router();
const controller = new ImageController();
imageRoutse.get('/', authHandle(["USER"]), controller.findImages);
imageRoutse.post('/addImage',joiHandle(imagenSchema, 'body') ,authHandle(["USER"]), controller.createImage);
imageRoutse.get('/:id', authHandle(["USER"]), controller.findOneImage);
imageRoutse.delete('/:id', authHandle(["USER"]), controller.deleteImage);