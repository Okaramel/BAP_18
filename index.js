import express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");          // use ejs as renderer
app.use(express.static("./public"));    // use express.static to serve static files for frontend

app.use(router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
