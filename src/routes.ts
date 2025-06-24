import { Router, Request, Response } from "express";
import { createApp } from "./controllers/appController";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Alt apps API is running!" });
});

router.post("/applications", createApp);

export default router;
