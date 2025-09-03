import { useEffect, useState } from "react";
import styles from "./quizCard.module.css";

const QuizCard = ({ quiz, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [counter, setCounter] = useState(8);

  // Håndterer svar
  const handleAnswer = (optionId) => {
    setSelectedOption(optionId);
    setIsCorrect(optionId === quiz.correctOptionId);
  };

  // Timer + automatisk næste spørgsmål
  useEffect(() => {
    if (!selectedOption) return;

    let timeLeft = 8;
    setCounter(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setCounter(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        onNext(); // Går til næste spørgsmål
      }
    }, 1000);

    // clear timer ved nyt spørgsmål
    return () => clearInterval(interval);
  }, [selectedOption, onNext]);

  // Nulstil state ved nyt spørgsmål
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCounter(8);
  }, [quiz]);

  return (
    <form className={styles.QuizForm}>
      <img src="/quiz.jpg" alt="Picture of school" />

      {selectedOption ? (
        <div className={styles.timer}>
          <p>Næste spørgsmål begynder om</p>
          <label className={styles.counter}>{counter}</label>
        </div>
      ) : (
        <h2>{quiz.question}</h2>
      )}

      {quiz.options.map((option, index) => {
        const isSelected = selectedOption === option._id;
        const isRightAnswer = option._id === quiz.correctOptionId;

        let btnStyle = styles.optionBtn;
        if (selectedOption) {
          if (isSelected && isCorrect)
            btnStyle = `${styles.optionBtn} ${styles.correct}`;
          if (isSelected && !isCorrect)
            btnStyle = `${styles.optionBtn} ${styles.wrong}`;
          if (!isSelected && isRightAnswer)
            btnStyle = `${styles.optionBtn} ${styles.correct}`;
        }

        return (
          <button
            key={option._id}
            type="button"
            className={btnStyle}
            onClick={() => handleAnswer(option._id)}
            disabled={!!selectedOption}
          >
            <label className={styles.optionLabel}>
              {String.fromCharCode(65 + index)}
            </label>
            <p>{option.text}</p>
          </button>
        );
      })}
    </form>
  );
};

export default QuizCard;
