import express from "express";
import {
    getEtiquettes,
    createEtiquette,
    deleteEtiquette,
} from "../controllers/EtiquetteController.js";

const router = express.Router();

router.get("/", getEtiquettes);
router.post("/", createEtiquette);
router.delete("/:id", deleteEtiquette);

export default router;
