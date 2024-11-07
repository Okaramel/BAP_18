import express from "express";
import {
    getAdmin,
    createAdmin,
    deleteAdmin,
    updateAdmin,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/", createAdmin);
router.delete("/:id", deleteAdmin);
router.put("/:id", updateAdmin);

export default router;
