import { useState } from "react";
import UploadFile from "../components/UploadFile";
import QuizView from "../components/QuizView";

function Home() {
  const [quiz, setQuiz] = useState([]);

  return (
    <div>
      <h1>PDF/TXT Quiz Generator</h1>
      <UploadFile setQuiz={setQuiz} />
      {quiz.length > 0 && <QuizView quiz={quiz} />}
    </div>
  );
}

export default Home;
