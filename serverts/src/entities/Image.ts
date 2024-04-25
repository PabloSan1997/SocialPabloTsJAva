import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Users } from "./Users";
import { Coments } from "./Coments";

@Entity()
export class Image{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:280})
    description:string;

    @Column({length:5000, name:'url_image'})
    urlImage:string;

    @CreateDateColumn({name:"create_at"})
    createAt:Date;

    @OneToMany(()=>Coments, coments=>coments.image, {onDelete:'SET NULL'})
    coments:Coments[]

    @ManyToOne(()=>Users, users=>users.images, {onDelete:'CASCADE'})
    @JoinColumn({name:'id_user'})
    user:Users;
}