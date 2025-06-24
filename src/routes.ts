import { Router, Request, Response } from "express";
import { createPrg } from "./controllers/prgController";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Alt apps API is running!" });
});

router.post("/programs", createPrg);

export default router;
