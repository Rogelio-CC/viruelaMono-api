import cron from 'node-cron'
import { monkeyPoxModel } from '../../data/models/monkeypox.model'
import { EmailService } from '../services/email.service';
import { generatemonkeyPoxEmailTemplate } from '../templates/email.template';

const emailService = new EmailService();

export const emailJob = () => {
    cron .schedule("*/10 * * * * *", async ()=>{
        //console.log("ejecución cada 10 segundos...")
        try {
            const monkeyPoxs = await monkeyPoxModel.find({ isSent: false });
            if(!monkeyPoxs.length){
                console.log("No hay casos de viruela pendientes por enviar");
                return;
            }

            console.log(`Procesando ${monkeyPoxs.length} casos.`)

            await Promise.all(
                monkeyPoxs.map(async (monkeyPox)=>{
                    console.log(monkeyPox)
                    try {
                        const htmlBody = generatemonkeyPoxEmailTemplate(
                            monkeyPox.lat,
                            monkeyPox.lng,
                            monkeyPox.genre,
                            monkeyPox.age
                        )
                        await emailService.sendEmail({
                            to: "rogelioceballos218@gmail.com",
                            subject: `Detalles de la persona enferma: Género de la persona: ${monkeyPox.genre}, Edad de la persona: ${monkeyPox.age} `,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el incident con Id: ${monkeyPox._id}`)
                        let updateIncident = {
                            lat: monkeyPox.lat,
                            lng: monkeyPox.lng,
                            genre: monkeyPox.genre,
                            age: monkeyPox.age,
                            isSent: true,
                            creationDate: Date.now()
                        };
    
                        await monkeyPoxModel.findByIdAndUpdate(monkeyPox._id, updateIncident);
                        console.log(`Incidente actualizado para el Id: ${monkeyPox._id}`);
                        
                    } catch (error) {
                        console.error("Error al procesar el caso")
                    }
                })
            );
            
        } catch (error) {
            console.error("Error durante el envio de correos")
        }
    });
}