
import { useEffect, useState } from "react";
import "./Interviews.css";

const interviewQuestions = {
  Frontend: [
    "What is the difference between let, const and var in JavaScript?",
    "Explain the CSS box model.",
    "What is the virtual DOM?",
  ],
  Backend: [
    "What is a REST API?",
    "Explain the difference between SQL and NoSQL databases.",
    "What is middleware?",
  ],
  React: [
    "What are React hooks?",
    "Explain the component lifecycle.",
    "What is the purpose of keys in lists?",
  ],
  JavaScript: [
    "What is a closure?",
    "Explain event bubbling and capturing.",
    "What is the difference between == and ===?",
  ],
  HR: [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "Describe a challenge you overcame.",
  ],
};

function Interviews() {
  const [category, setCategory] = useState("Frontend");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(165);
  const [submitted, setSubmitted] = useState(false);

  const questions = interviewQuestions[category];
  const question = questions[questionIndex % questions.length];

  useEffect(() => {
    if (submitted || time === 0) return;

    const timer = setInterval(() => {
      setTime((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted, time]);

  function changeCategory(nextCategory) {
    setCategory(nextCategory);
    setQuestionIndex(0);
    setAnswer("");
    setTime(165);
    setSubmitted(false);
  }

  function nextQuestion() {
    setQuestionIndex((previous) => previous + 1);
    setAnswer("");
    setTime(165);
    setSubmitted(false);
  }

  function submitAnswer() {
    if (!answer.trim()) return;
    setSubmitted(true);
  }

  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <section className="interviews-page">
      <div className="interviews-heading">
        <span className="interviews-eyebrow">MOCK INTERVIEW</span>
        <h2>Practice, get feedback, improve</h2>
        <p>Build confidence one question at a time.</p>
      </div>

      <div className="interview-layout">
        <aside className="interview-card">
          <p className="interview-label">CATEGORIES</p>

          <div className="category-list">
            {Object.keys(interviewQuestions).map((item) => (
              <button
                type="button"
                key={item}
                className={`category-item ${
                  category === item ? "active" : ""
                }`}
                onClick={() => changeCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <div className="interview-card question-card">
          <div className="question-top">
            <span className="question-count">
              Question {questionIndex + 1}
            </span>
            <span className="interview-timer">{formattedTime}</span>
          </div>

          <h3>{question}</h3>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Type your answer here..."
            rows={6}
            disabled={submitted || time === 0}
          />

          {time === 0 && !submitted && (
            <p className="interview-notice">
              Time is up. Move to the next question to continue.
            </p>
          )}

          <div className="question-actions">
            <button
              type="button"
              className="interview-secondary"
              onClick={nextQuestion}
            >
              Skip Question
            </button>

            <button
              type="button"
              className="interview-primary"
              onClick={submitAnswer}
              disabled={submitted || !answer.trim() || time === 0}
            >
              Submit Answer
            </button>
          </div>

          {submitted && (
            <p className="interview-notice">
              Answer submitted! Review the feedback panel.
            </p>
          )}
        </div>

        <aside className="interview-card feedback-card">
          <p className="interview-label">AI FEEDBACK</p>

          {!submitted ? (
            <p className="feedback-muted">
              Submit an answer to see feedback here.
            </p>
          ) : (
            <>
              {[
                ["Technical Accuracy", 82],
                ["Communication", 76],
                ["Confidence", 70],
              ].map(([label, score]) => (
                <div className="feedback-row" key={label}>
                  <div className="feedback-label">
                    <span>{label}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="feedback-track">
                    <div style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}

              <p className="interview-label improvement-label">
                IMPROVEMENT TIP
              </p>
              <p className="feedback-muted">
                Try giving a concrete example alongside your definition next
                time.
              </p>
              <p className="feedback-note">
                These are demo scores, not AI-generated evaluation.
              </p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default Interviews;
