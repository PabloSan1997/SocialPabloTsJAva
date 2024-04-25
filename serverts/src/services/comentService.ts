import { AppDataSource } from "../db/config";
import { Coments } from "../entities/Coments";
import { Image } from "../entities/Image";
import { Users } from "../entities/Users";
import boom from '@hapi/boom';


export class ComentService{
    private userRepository = AppDataSource.getRepository(Users);
    private imageRepository = AppDataSource.getRepository(Image);
    private comentRepository = AppDataSource.getRepository(Coments);

    async addComent(username:string, id_image:string, data:{coment:string}){
        const userS = this.userRepository.findOne({where:{
            username:!!username?username:''
        }, relations:{
            coments:true
        }});
        const imagenS = this.imageRepository.findOne({where:{id:id_image}});
        const user = await userS;
        const image = await imagenS;
        if(!user || !image) throw boom.badRequest("no se puede agregar comentario"); 
        const coment = this.comentRepository.create(data);
        coment.image = image;
        coment.user = user;
        await this.comentRepository.save(coment);
        return {message:"Comentario agregado con exito"};
    }

    async deletecoment(username:string, id:string){
        const coment = await this.comentRepository.findOne({
            where:{
                id
            },
            relations:{
                user:true,
                image:{
                    user:true
                }
            }
        });
        if(!coment) throw boom.notFound('No se encontro elemento');
        if(coment.user.username!=username && coment.image.user.username!=username) 
            throw boom.badRequest('No tienes permiso para esta accion');

        this.comentRepository.delete({id});
    }

}