import Url from "../Model/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  let shortCode;

  const isExistingUrl = await Url.findOne({ longUrl });

  if (isExistingUrl) {
    console.log("already existing url");
    shortCode = isExistingUrl.shortCode;
  } else {
    console.log("new url generated");
    shortCode = shortid.generate();
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();
  }

 const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

  console.log("short saved = ", shortUrl);

  res.render("index.ejs", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = await Url.findOne({ shortCode });

  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortcode" });
  }
};
