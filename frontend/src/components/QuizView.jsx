function QuizView({ quiz }) {
  return (
    <div>
      {quiz.map((q, i) => (
        <div key={i}>
          <p>{i + 1}. {q.question}</p>
          {q.options.map((opt, idx) => (
            <div key={idx}>
              <input type="radio" name={`q${i}`} /> {opt}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default QuizView;
