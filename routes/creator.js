import express from "express";
import {
    getCreators,
    getCreatorById,
    createCreator,
    deleteCreator,
    updateCreator,
} from "../controllers/CreatorController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getCreators);
router.get("/:id", verifyToken, getCreatorById);
router.post("/", verifyToken, createCreator);
router.delete("/:id", verifyToken, deleteCreator);
router.put("/:id", verifyToken, updateCreator);

export default router;
