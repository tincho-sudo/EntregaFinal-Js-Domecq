const { LeaderModel } = require("../models/models.index.js");
const getAllLeaders = async (_, res) => {
  try {
    const leaderList = await LeaderModel.find({}).sort({ score: -1 });
    res.status(200).json(leaderList);
  } catch (err) {
    res.status(404).send("No Leaders found");
  }
};

const newLeader = async (req, res) => {
  const { name, score } = req.body;
  if (!score) return res.status(404).send("Score not defined");
  if (!name) return res.status(404).send("Name not defined");
  try {
    const leaderExists = await LeaderModel.findOne({ name: req.body.name });
    if (leaderExists) return res.status(404).send("User already exists");
    const newLeader = new LeaderModel(req.body);
    const save = await newLeader.save();
    res.status(200).json(save);
  } catch (err) {
    res.send(err);
  }
}

const getLeader = async (req, res) => {
  try {
    const leader = await LeaderModel.findById(req.params.id);
    if (!leader) return res.status(404).send("User not defined");
    res.status(200).res.send(leader);
  } catch (err) {
    res.send(err);
  }
};

const modifyLeader = async (req, res) => {
  try {
    const leader = await LeaderModel.findById(req.params.id);
    if (!leader) return res.status(404).send("User not defined");
    const { name, score } = req.body;
    if (score) leader.score = score;
    if (name) leader.name = name;
    leader.save();
    res.status(200).send(leader);
  } catch (err) {
    res.send(err);
  }
};

const deleteLeader = async (req, res) => {
  try {
    const leader = await LeaderModel.findById(req.params.id);
    if (!leader) return res.status(404).send("User not defined");
    res.status(200).send(leader);
    leader.remove();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getAllLeaders,
  newLeader,
  getLeader,
  modifyLeader,
  deleteLeader,
};
