import express from "express";
import { SendingMailController } from "../controllers/SendingMailController.js";

const app = express();
const port = 3000;

const router = express.Router();

router.post("/", SendingMailController);

export default router;