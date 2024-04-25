import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Image } from "./Image";
import { Users } from "./Users";

@Entity()
export class Coments{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:280})
    coment:string;

    @CreateDateColumn({name:"create_at"})
    createAt:Date;

    @ManyToOne(()=>Image, imagen=>imagen.coments, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_image'})
    image:Image;

    @ManyToOne(()=>Users, imagen=>imagen.coments, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user'})
    user:Users;
}