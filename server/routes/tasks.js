import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("Tasks");
    let result = await collection.find().toArray();
    res.send(result).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("Tasks");
    console.log(`req.params.id: ${req.params.id}`);
    const taskId = new ObjectId(req.params.id);
    const query = { profileId: taskId };
    let result = await collection.find(query).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


export default router;