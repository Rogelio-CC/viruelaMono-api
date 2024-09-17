import { Router } from "express";
import { MonkeyPoxController } from "./controller";

export class MonkeyPoxRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new MonkeyPoxController();
        router.get("/", controller.getMonkeyPoxCases);
        router.post("/", controller.createMonkeyPoxCase);
        router.get("/last-week", controller.getMonkeyPoxCaseByLastWeek);
        router.put("/:id", controller.updateMonkeyPoxCase);
        router.delete("/:id", controller.deleteMonkeyPoxCase);
        return router;
    }
}