import express from 'express';
import 'dotenv/config'
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/routes';
import { emailJob } from './domain/jobs/email.job';

const app= express();

app.use(express.json());
app.use(AppRoutes.routes);

(async()=>
   await MongoDatabase.connect({
    dbName: "MonkeyPoxCasesAPI",
    mongoUrl: envs.MONGO_URL ?? ""
}))();


app.listen(3000, ()=>{
    console.log("El servidor esta corriendo");
    emailJob();
})