import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/router.js";
import { Resend } from "resend";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs"); // use ejs as renderer
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/emailing", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "morell.mathilde74@gmail.com",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
