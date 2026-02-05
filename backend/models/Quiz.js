const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  questions: Array,
  sourceFile: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
