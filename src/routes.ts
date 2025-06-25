import { Router, Request, Response } from "express";
import {
  createPrg,
  getAllPrgs,
  getPrgsById,
  updatePrgById,
  deletePrgById,
  getPrgsByQuery,
} from "./controllers/prgController";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "./controllers/authController";

const router: Router = Router();

// Health check / Welcome route
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

// Auth routes
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post("/user/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Login a user
 *     description: Takes a user in the body and tries to login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post("/user/login", loginUser);

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
router.post("/programs", verifyToken, createPrg);

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

//- get program by a query
/**
 * @swagger
 * /programs/query/{key}/{val}:
 *   get:
 *     tags:
 *       - Program Routes
 *     summary: Get Program by query
 *     description: Retrieves Program by a query. Example&#58; "/programs/query/description/example" to find a program where the description includes the word example. (case-insensitive)
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         description: Query key
 *         schema:
 *           type: string
 *       - in: path
 *         name: val
 *         required: true
 *         description: Query value
 *         schema:
 *           type: string
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
router.get("/programs/query/:key/:val", getPrgsByQuery);

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
router.put("/programs/:id", verifyToken, updatePrgById);

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
router.delete("/programs/:id", verifyToken, deletePrgById);

export default router;
