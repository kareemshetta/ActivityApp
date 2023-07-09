const express = require("express");
const router = express.Router();
const wordsController = require("../controllers/wordsController");

router.route("/words").get(wordsController.getRandomWords);

router.route("/ranks").post(wordsController.rank);

module.exports = router;
