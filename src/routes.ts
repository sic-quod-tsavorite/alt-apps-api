import { Router, Request, Response } from "express";
import { createPrg, getAllPrgs } from "./controllers/prgController";

const router: Router = Router();

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - App Routes
 *    summary: Health check
 *    description: Basic route to check if the api is running
 *    responses:
 *      200:
 *        description: Server up and running.
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Alt apps API is running!" });
});

// Program routes
//- create
/**
 * @swagger
 * /programs:
 *   post:
 *     tags:
 *       - Program Routes
 *     summary: Create a new Program
 *     description: Creates a new Program
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Program"
 *     responses:
 *       201:
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Program"
 */
router.post("/programs", createPrg);

//- gets all programs
/**
 * @swagger
 * /programs:
 *   get:
 *     tags:
 *       - Program Routes
 *     summary: Get all Programs
 *     description: Retrieves all Programs
 *     responses:
 *       200:
 *         description: A list of Programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Program"
 */
router.get("/programs", getAllPrgs);

export default router;
