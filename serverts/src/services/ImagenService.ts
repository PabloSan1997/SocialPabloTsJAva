import { AppDataSource } from "../db/config"
import { Image } from "../entities/Image";
import { Users } from "../entities/Users";
import boom from '@hapi/boom';


export class ImagenService{
    private imageRepository = AppDataSource.getRepository(Image);
    private userRepository = AppDataSource.getRepository(Users);

    async readImage(username:string){
        
        const user = this.userRepository.findOne({where:{username:!!username?username:''}, select:{nickname:true, username:true}});
        const data =  this.imageRepository.find({
            relations:{
                user:{
                    userInfo:true
                },
                coments:true
            },
            order:{
                createAt:'DESC'
            },
            select:{
                id:true,
                description:true,
                urlImage:true,
                createAt:true,
                user:{
                    id:true,
                    username:true,
                    nickname:true,
                    userInfo:{
                        perfilImage:true
                    }
                },
                coments:{
                    id:true
                }
            }
        });

        const showUser = await user;
        if(!showUser) throw boom.badImplementation();
        const im = (await data).map(i=>{
            const number = i.coments.length;
            return {
                ...i,
                coments:number
            }
        });
       
        return {dataInfo:showUser, images:im}
    }

    async readImageId(id:string, username:string){
    const user = await this.userRepository.findOne({where:{username:!!username?username:''}, select:{nickname:true, username:true}});
       const data = await this.imageRepository.findOne({
            where:{
                id
            },
            order:{
                coments:{
                    createAt:'ASC'
                }
            },
            relations:{
                user:{
                    userInfo:true
                },
                coments:{
                    user:{
                        userInfo:true
                    }
                }
            },
            select:{
                id:true,
                description:true,
                urlImage:true,
                createAt:true,
                user:{
                    id:true,
                    username:true,
                    nickname:true,
                    userInfo:{
                        perfilImage:true
                    }
                },
                coments:{
                    id:true,
                    coment:true,
                    createAt:true,
                    user:{
                        username:true,
                        nickname:true,
                        id:true,
                        userInfo:{
                            perfilImage:true
                        }
                    }
                }
            }
        });

        if(!data || !user) throw boom.notFound('No se encontro imagen');
        return {dataInfo:user, images:data};
    }

    async addImage(imagenDto:AddImageDto, username:string){
        const user = await this.userRepository.findOne({
            where:{
                username:!!username?username:''
            }
        });

        if(!user) throw boom.unauthorized("No se puede agregar imagen");

        const newImage = this.imageRepository.create(imagenDto);
        newImage.user = user;
        await this.imageRepository.save(newImage);
        return {message:"Imagen agregada con exito"};
    }

    async deleteImage(username:string, id_image:string){
        const image = await this.imageRepository.findOne({where:{id:id_image}, relations:{user:true}});
        if(!image) throw boom.notFound('No se encontro imagen');
        if(image.user.username!==username) throw boom.unauthorized('No puedes borrar esta imagen');
        this.imageRepository.delete({id:id_image});
    }
}