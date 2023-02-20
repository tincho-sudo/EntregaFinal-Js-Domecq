const { getAllQuestions } = require("../controllers/controllers.questions.js");
const express = require("express");
const router = express();

// added put and delete as a devConsole debug method
router.route("/questions/").get(getAllQuestions);

module.exports = router;
