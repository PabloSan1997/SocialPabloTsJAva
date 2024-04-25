import { Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Roles{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({length:50, unique:true})
    name:string;

    @ManyToMany(()=>Users, users=>users.roles, {onDelete:'SET NULL'})
    users:Users[];    

}