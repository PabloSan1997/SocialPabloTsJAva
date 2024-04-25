import 'dotenv/config';
import {randomBytes} from 'node:crypto';

export const envVariables = {
    port:process.env.PORT??3010,
    mode_dev:process.env.MODE_DEV=='dev',
    url_db:process.env.URL_DB as string,
    key:randomBytes(32).toString('hex')
}