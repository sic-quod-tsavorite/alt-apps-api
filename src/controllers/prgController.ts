import { Request, Response } from "express";
import { prgModel } from "../models/prgModel";
import { connect, disconnect } from "../repository/database";

// CRUD - create, read/get, update, delete
/**
 * Creates a new program in the data source based on the request body
 * @param req
 * @param res
 */
export async function createPrg(req: Request, res: Response): Promise<void> {
  const data = req.body;

  try {
    await connect();

    const prg = new prgModel(data);
    const result = await prg.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating program. Error: " + err);
  } finally {
    await disconnect();
  }
}
