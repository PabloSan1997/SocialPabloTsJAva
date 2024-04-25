import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { statusCodes } from "../utilities/StatusCodes";

const service = new UsuarioService();

export class UserController {

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await service.register(req.body);
            res.status(statusCodes.create).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const datos = await service.login(req.body);
            res.setHeader("Authorization", `Bearer ${datos.token}`);
            res.json(datos);
        } catch (error) {
            next(error);
        }
    }

    async deleteCount(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.headers.username;
            await service.deleteCount(username as string);
            res.json({username});
        } catch (error) {
            next(error);
        }
    }

    async perfil(req: Request, res: Response, next: NextFunction) {
        try {
            const datos = await service.findPerfil(req.headers.username as string);
            res.json(datos);
        } catch (error) {
            next(error);
        }
    }

    async perfilFriend(req: Request, res: Response, next: NextFunction) {
        try {
            const datos = await service.findPerfilByUsername(req.params.username, req.headers.username as string);
            res.json(datos);
        } catch (error) {
            next(error);
        }
    }
}