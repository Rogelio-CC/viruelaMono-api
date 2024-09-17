import { Router } from "express";
import { MonkeyPoxRoutes } from "./monkeyPox/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use("/api/monkeyPoxCases", MonkeyPoxRoutes.routes);
        return router;
    }
}