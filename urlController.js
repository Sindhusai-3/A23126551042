const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    let code = shortcode;

    if (code) {
      const exists = await Url.findOne({
        shortcode: code,
      });

      if (exists) {
        return res.status(409).json({
          message: "Shortcode already exists",
        });
      }
    } else {
      code = nanoid(6);
    }

    const expiry = new Date(
      Date.now() + (validity || 30) * 60000
    );

    await Url.create({
      originalUrl: url,
      shortcode: code,
      expiry,
    });

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};