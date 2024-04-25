import {DataSource} from 'typeorm';
import { envVariables } from '../utilities/envVariables';
import { Coments } from '../entities/Coments';
import { Image } from '../entities/Image';
import { Users } from '../entities/Users';
import { UserInfo } from '../entities/UserInfo';
import { Roles } from '../entities/Roles';

export const AppDataSourceMigration = new DataSource({
    type:'postgres',
    url:envVariables.url_db,
    logging:envVariables.mode_dev,
    entities:[Coments, Image, Users, UserInfo, Roles],
    migrations:['src/migrations/*.ts'],
    migrationsTableName:'migrations-sosialpablo'
});

//npm run typeorm migration:run -- -d path-to-datasource-config

//npm run typeorm migration:revert -- -d path-to-datasource-config