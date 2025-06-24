import { Request, Response } from "express";
import { appModel } from "../models/appModel";
import { connect, disconnect } from "../repository/database";

// CRUD - create, read/get, update, delete
/**
 * Creates a new application in the data source based on the request body
 * @param req
 * @param res
 */
export async function createApp(req: Request, res: Response): Promise<void> {
  const data = req.body;

  try {
    await connect();

    const app = new appModel(data);
    const result = await app.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating application. Error: " + err);
  } finally {
    await disconnect();
  }
}
