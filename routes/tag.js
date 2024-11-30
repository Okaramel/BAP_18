import express from "express";
import {
    getTags,
    getTagById,
    createTag,
    deleteTag,
    updateTag,
} from "../controllers/TagController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getTags);
router.get("/:id", verifyToken, getTagById);
router.post("/", verifyToken, createTag);
router.delete("/:id", verifyToken, deleteTag);
router.put("/:id", verifyToken, updateTag);

export default router;
