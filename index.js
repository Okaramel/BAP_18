import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});