import { AppDataSource } from "../db/config";
import { Roles } from "../entities/Roles";
import { UserInfo } from "../entities/UserInfo";
import { Users } from "../entities/Users";
import boom from '@hapi/boom';
import { hash, compare } from 'bcrypt';
import { createToken } from "../utilities/jwtUtilities";
import { Image } from "../entities/Image";

export class UsuarioService {
    private userRepository = AppDataSource.getRepository(Users);
    private roleRepositroy = AppDataSource.getRepository(Roles);
    private infoRepository = AppDataSource.getRepository(UserInfo);
    private imageRepository = AppDataSource.getRepository(Image);

    async findPerfil(username:string){
        const buscar = this.userRepository.findOne(
            {
                where:{
                    username:!!username?username:''
                },
                relations:{
                    userInfo:true,
                },
              select:{
                id:true,
                username:true,
                nickname:true
              }
            }
        );
        if(!(await buscar)) throw boom.notFound('No se enctontre usuario');
        const images = this.imageRepository.find({
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
            },
            where:{
                user:{
                    username:!!username?username:''
                }
            }
        });
        const show = (await images).map(p=>{
            const coments = p.coments.length;
            return {
                ...p,
                coments
            }
        });
        return {... (await buscar), images:show};
    }


    async findPerfilByUsername(usernameFiend:string, username:string){
            const dataInfo = await this.userRepository.findOne({
                where:{
                    username:!!username?username:''
                },
                select:{
                    username:true,
                    nickname:true
                }
            });
            if(!dataInfo) throw boom.badRequest('No tienes permiso');
            const datos = await this.findPerfil(usernameFiend);
            return {dataInfo, perfil:datos}
    }

    async register(newUserRequest: RegisterDto) {

        const viewUser = this.userRepository.findOne({
            where: {
                username: newUserRequest.username
            }
        });

        const roles = this.roleRepositroy.find({ where: { name: 'ROLE_USER' } });

        const createHash = hash(newUserRequest.password, 8);

        if (!!(await viewUser)) throw boom.badRequest('Nombre de usuario existente');
        if ((await roles).length == 0) throw boom.badImplementation();

        const theroles = await roles;

        const userInfo = this.infoRepository.create({
            perfilImage: newUserRequest.perfilImage,
            description: newUserRequest.description
        });

        await this.infoRepository.save(userInfo);

        const newUser = this.userRepository.create({
            username: newUserRequest.username,
            userInfo,
            nickname: newUserRequest.nickname,
            password: await createHash,
            roles: theroles
        });

        await this.userRepository.save(newUser);

        const res: Partial<Users> = {
            ...newUser
        }
        delete res.password;
        return res;
    }


    async login(dataUser: LoginDto) {
        const { username, password } = dataUser;
        const user = await this.userRepository.findOne({ 
            where: { username },
            relations:{
                roles:true
            }
         });
        if (!user) throw boom.badRequest('Usuario o contraseña incorrectos');
        const verify = await compare(password, user.password);
        if (!verify) throw boom.badRequest('Usuario o contraseña incorrectos');
        const roles = user.roles.map(p=>({authority:p.name}));
        const preToken:PreTakenObject = {
            username,
            authorities:roles
        }
        const token = createToken(preToken);
        return {token, username}
    }

    async deleteCount(username: string) {
        this.userRepository.delete({ username });
    }

}