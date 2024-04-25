import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./UserInfo";
import { Image } from "./Image";
import { Roles } from "./Roles";
import { Coments } from "./Coments";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, unique: true })
    username: string;

    @Column({ length: 50 })
    nickname: string;

    @Column({ length: 5000 })
    password: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.user, { onDelete: 'CASCADE' })
    userInfo: UserInfo;

    @OneToMany(() => Image, images => images.user, { onDelete: 'SET NULL' })
    images: Image[];

    @OneToMany(() => Coments, coments => coments.user, { onDelete: 'SET NULL' })
    coments: Coments[];


    @ManyToMany(() => Roles, roles => roles.users, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_role'
        }
    })
    roles: Roles[]
    newUser: Promise<Roles[]>;
}