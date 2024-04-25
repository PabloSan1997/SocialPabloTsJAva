import { Request, Response, NextFunction } from "express";
import { ImagenService } from "../services/ImagenService";
import { statusCodes } from "../utilities/StatusCodes";

const service = new ImagenService();

export class ImageController {
    async createImage(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.headers.username as string;
            const newImage = await service.addImage(req.body, username);
            res.status(statusCodes.create).json(newImage);
        } catch (error) {
            next(error);
        }
    }
    async findImages(req: Request, res: Response, next: NextFunction){
        try {
            const imagenes = await service.readImage(req.headers.username as string);
            res.json(imagenes);
        } catch (error) {
            next(error);
        }
    }
    async findOneImage(req: Request, res: Response, next: NextFunction){
        try {
            const imagen = await service.readImageId(req.params.id ,req.headers.username as string);
            res.json(imagen);
        } catch (error) {
            next(error);
        }
    }
    async deleteImage(req: Request, res: Response, next: NextFunction){
        try {
            await service.deleteImage(req.headers.username as string, req.params.id);
            res.sendStatus(statusCodes.notContent);
        } catch (error) {
            next(error);
        }
    }
}