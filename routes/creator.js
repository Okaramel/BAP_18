import express from "express";
import {
    getCreators,
    createCreator,
    deleteCreator,
} from "../controllers/CreatorController.js";

const router = express.Router();

router.get("/", getCreators);
router.post("/", createCreator);
router.delete("/:id", deleteCreator);

export default router;
