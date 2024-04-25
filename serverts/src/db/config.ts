import {DataSource} from 'typeorm';
import { envVariables } from '../utilities/envVariables';
import { Coments } from '../entities/Coments';
import { Image } from '../entities/Image';
import { Users } from '../entities/Users';
import { UserInfo } from '../entities/UserInfo';
import { Roles } from '../entities/Roles';

export const AppDataSource = new DataSource({
    type:'postgres',
    url:envVariables.url_db,
    logging:envVariables.mode_dev,
    synchronize:envVariables.mode_dev,
    entities:[Coments, Image, Users, UserInfo, Roles]
});