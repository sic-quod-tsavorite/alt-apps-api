import { Request, Response } from "express";
import { altPrgModel } from "../models/altPrgModel";
import { connect, disconnect } from "../repository/database";

// CRUD - create, read/get, update, delete
/**
 * Creates a new alternative program in the data source based on the request body
 * @param req
 * @param res
 */
export async function createAltPrg(req: Request, res: Response): Promise<void> {
  const data = req.body;

  try {
    await connect();

    const aprg = new altPrgModel(data);
    const result = await aprg.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating alternative program. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves all alternative programs from the data source
 * @param req
 * @param res
 */
export async function getAllAltPrgs(req: Request, res: Response) {
  try {
    await connect();

    const result = await altPrgModel.find({});

    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send("Error retrieving alternative programs. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Retrieves an alternative program by its id from the data source
 * @param req
 * @param res
 */
export async function getAltPrgsById(req: Request, res: Response) {
  try {
    await connect();

    const id = req.params.id; // get the id from the request
    const result = await altPrgModel.findById(id);

    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send("Error retrieving alternative program by id. Error: " + err);
  } finally {
    await disconnect();
  }
}

/**
 * Update an alternative program by its id from the data source
 * @param req
 * @param res
 */
export async function updateAltPrgById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await altPrgModel.findByIdAndUpdate(id, req.body);
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
export async function deleteAltPrgById(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await connect();

    const result = await altPrgModel.findByIdAndDelete(id);
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

/**
 * Retrieves a program with a query from the data source
 * @param req
 * @param res
 */
/*
export async function getPrgsByQuery(req: Request, res: Response) {
  const key = req.params.key;
  const val = req.params.val;

  try {
    await connect();

    const result = await altPrgModel.find({
      [key]: { $regex: val, $options: "i" },
    });

    res.status(200).send(result);
  } catch (err) {
    res
      .status(500)
      .send("Error retrieving program with the query. Error: " + err);
  } finally {
    await disconnect();
  }
}
*/
