import { Router, Request, Response } from "express";
import {
  createPrg,
  getAllPrgs,
  getPrgsById,
  updatePrgById,
  deletePrgById,
} from "./controllers/prgController";

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

//- get a program by its id
/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     tags:
 *       - Program Routes
 *     summary: Get a Program by ID
 *     description: Retrieves a Program by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Program
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Program object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Program"
 */
router.get("/programs/:id", getPrgsById);

//- update
/**
 * @swagger
 * /programs/{id}:
 *   put:
 *     tags:
 *       - Program Routes
 *     summary: Updates a specific Program
 *     description: Updates a specific Program based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Program"
 *
 *     responses:
 *       200:
 *         description: Program updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Program"
 */
router.put("/programs/:id", updatePrgById);

//- delete
/**
 * @swagger
 * /programs/{id}:
 *   delete:
 *     tags:
 *       - Program Routes
 *     summary: Deletes a specific Program
 *     description: Deletes a specific Program based on its id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID from repository
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program deleted successfully
 */
router.delete("/programs/:id", deletePrgById);

export default router;
