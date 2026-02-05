const fs = require("fs");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");
const Quiz = require("../models/Quiz");

// Multer Config (can also put in separate file if you like)
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF or TXT allowed"));
    }
  },
});

// Extract Text from PDF/TXT
async function extractText(file) {
  if (file.mimetype === "application/pdf") {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text;
  }
  return fs.readFileSync(file.path, "utf-8");
}

// Generate Quiz using OpenAI
async function generateQuiz(text) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
  Generate 5 MCQ questions from the text below.
  Each question must have 4 options and 1 correct answer.
  Return ONLY JSON.

  Text:
  ${text}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const quiz = JSON.parse(response.choices[0].message.content);
  return quiz;
}

// Controller for uploading file and creating quiz
exports.createQuiz = async (req, res) => {
  try {
    const text = await extractText(req.file);
    const questions = await generateQuiz(text);

    const quiz = await Quiz.create({
      questions,
      sourceFile: req.file.originalname,
    });

    res.json(quiz);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports.upload = upload; // export multer config
