const express = require("express");
const router = express.Router();
const { createQuiz, upload } = require("../controllers/quizController");

router.post("/upload", upload.single("file"), createQuiz);

module.exports = router;
