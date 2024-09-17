import { Request, Response } from "express"
import { monkeyPoxModel } from "../../data/models/monkeypox.model";
import { EmailService } from "../../domain/services/email.service";
export class MonkeyPoxController{
    public getMonkeyPoxCases = async(req: Request, res: Response) => {
        try{
            const monkeyPoxs = await monkeyPoxModel.find()
            return res.json(monkeyPoxs)

        }catch(error){
            return res.json([])
        }
        
    }

    public createMonkeyPoxCase = async(req: Request, res:  Response) => {
        try{
            const {lat, lng, genre, age} = req.body;
            const newMonkeyPoxCase = await monkeyPoxModel.create({
                lat:lat,
                lng:lng,
                genre:genre,
                age:age
            });
            /* const emailService = new EmailService();
            await emailService.sendEmail({
                to:"rogelioceballos218@gmail.com",
                subject: `Incidente: ${newIncident.title}`,
                htmlBody: `<h1>${newIncident.description}</h1>`
            }) */
            res.json(newMonkeyPoxCase)

        }catch(error){
            res.json({message: "Error creando registro"})
        }
    }

    public getMonkeyPoxCaseByLastWeek = async (req: Request, res: Response) => {
        try{
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);

            const monkeyPoxCases = await monkeyPoxModel.find({
            creationDate: { $gte: lastWeek }
            });
            return res.json(monkeyPoxCases)
        }catch(error){
            return res.json({message: "Ocurrio un error al traer los casos"})
        }
    }

    public updateMonkeyPoxCase = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { lat, lng, genre, age } = req.body;
            await monkeyPoxModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age
            });
            const updatedMonkeyPoxCase = await monkeyPoxModel.findById(id)
            return res.json(updatedMonkeyPoxCase)

        }catch(error){
            return res.json({message: "Ocurrio un error al actualizar un caso"})
        }
    }

    public deleteMonkeyPoxCase = async (req:Request,res : Response)=>{
        try {
            const { id } = req.params;
            await monkeyPoxModel.findByIdAndDelete(id);
            return res.json({message:"Caso eleminado"});
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar el caso"});
        }
    }
}