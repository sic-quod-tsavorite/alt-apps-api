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

/**
 * Retrieves all programs from the data source
 * @param req
 * @param res
 */
export async function getAllPrgs(req: Request, res: Response) {
  try {
    await connect();

    const result = await prgModel.find({});

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error retrieving programs. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves a program by its id from the data source
 * @param req
 * @param res
 */
export async function getPrgsById(req: Request, res: Response) {
  try {
    await connect();

    const id = req.params.id; // get the id from the request
    const result = await prgModel.findById(id);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error retrieving program by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Update a program by its id from the data source
 * @param req
 * @param res
 */
export async function updatePrgById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await prgModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).send("Cannot find program with id: " + id);
    } else {
      res.status(200).send("Program updated successfully.");
    }
  } catch (err) {
    res.status(500).send("Error updating program by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Delete a program by its id from the data source
 * @param req
 * @param res
 */
export async function deletePrgById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await prgModel.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send("Cannot delete program with id: " + id);
    } else {
      res.status(200).send("Program successfully deleted.");
    }
  } catch (err) {
    res.status(500).send("Error deleting program by id. Error: " + err);
  } finally {
    await disconnect();
  }
}
