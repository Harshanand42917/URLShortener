import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCode: String,
  longUrl: String,
});

const Url = mongoose.model("shortURL", urlSchema);
export default Url;
