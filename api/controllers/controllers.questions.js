const fs = require("fs");

const getAllQuestions = async (_, res) => {
  try {
    fs.readFile('./questions.json', (err, data) => {
      if (err) throw err;
      let questions = JSON.parse(data);
      res.status(200).json(JSON.parse(data));
    });

  } catch (err) {
    res.status(404).send("No questions found");
    console.log(err);
  }
};

module.exports = {
  getAllQuestions,
};
