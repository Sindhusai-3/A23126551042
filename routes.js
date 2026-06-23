const express = require("express");
const router = express.Router();

const {
  createShortUrl,
} = require("../controllers/urlController");

router.post("/shorturls", createShortUrl);

module.exports = router;