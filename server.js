import express from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./Controller/url.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://harshanand42917:S0d33GWPg0BTvMBQ@cluster0.i6opsi7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "url_shorted_db",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

app.get("/status", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "server is running fine",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
});

app.post("/short", shortUrl);
app.get("/:shortCode", getOriginalUrl);

// Server
const port = 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
