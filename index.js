import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
