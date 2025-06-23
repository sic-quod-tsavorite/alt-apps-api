import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Alt apps API is running!" });
});

export default router;
