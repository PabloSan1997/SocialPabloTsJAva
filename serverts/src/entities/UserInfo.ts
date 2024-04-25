import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Users } from "./Users";

@Entity({name:'user_info'})
export class UserInfo{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:280})
    description:string;

    @Column({length:5000, name:'perfil_image'})
    perfilImage:string;

    @OneToOne(()=>Users, user=>user.userInfo, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user'})
    user:Users
    
}