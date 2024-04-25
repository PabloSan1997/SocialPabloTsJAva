import "reflect-metadata";
import express from "express";
import { envVariables } from "./utilities/envVariables";
import { createApi } from "./routes/main";
import cors from 'cors';
import { boomHandle } from "./middlewares/boomHandle";
import { AppDataSource } from "./db/config";

const app = express();

app.use(cors());
app.use(express.json());

createApi(app);

app.use(boomHandle);

AppDataSource.initialize()
    .then(() => {
        app.listen(envVariables.port, () => {
            if (envVariables.mode_dev) {
                console.log(`http://localhost:${envVariables.port}`)
            }
        });
    })
    .catch(error => {
        console.log(error);
    })