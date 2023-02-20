
const {
  getLeader,
  modifyLeader,
  deleteLeader,
  newLeader,
  getAllLeaders,
} = require("../controllers/controllers.leader");
const express = require("express");
const router = express();


// added put and delete as a devConsole debug method
router
  .route("/leader/:id")
  .get(getLeader)
  .put(modifyLeader)
  .delete(deleteLeader);

router.route("/leaders/").get(getAllLeaders).post(newLeader);


module.exports = router;
