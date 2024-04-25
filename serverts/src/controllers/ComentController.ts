import { ComentService } from "../services/comentService";
import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../utilities/StatusCodes";

const service = new ComentService();

export class ComentController{
    async addComent(req: Request, res: Response, next: NextFunction){
        try {
            const username = req.headers.username as string;
            const {id} = req.params as {id:string};
            const datos = await service.addComent(username, id, req.body);
            res.status(statusCodes.create).json(datos);
        } catch (error) {
            next(error);
        }
    }

    async deleteComent(req: Request, res: Response, next: NextFunction){
        try {
            const username = req.headers.username as string;
            const {id} = req.params as {id:string};
            const datos = await service.deletecoment(username, id);
            res.status(statusCodes.create).json(datos);
        } catch (error) {
            next(error);
        }
    }
}