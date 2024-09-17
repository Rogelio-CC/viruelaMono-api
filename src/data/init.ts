import mongoose from "mongoose";

interface ConnectionOptions{
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase{
    static async connect(options:ConnectionOptions){
        try{
            await mongoose.connect(options.mongoUrl, {
                dbName: options.dbName
            });

            console.log('Connected to the database')
        }
        catch(error){
            console.error('Error connection to the database')
        }
    }
}