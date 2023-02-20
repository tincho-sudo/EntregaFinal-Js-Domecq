const { Router } = require("express");

const leaderRoutes = require("./routes.leader.js");
const questionRoutes = require("./routes.questions.js");

const router = Router();
router.use(leaderRoutes);
router.use(questionRoutes);

module.exports = router;