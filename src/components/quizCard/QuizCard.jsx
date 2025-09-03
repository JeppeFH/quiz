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

  // Timer-counter når et svar er valgt
  useEffect(() => {
    if (!selectedOption) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onNext(); // Går til næste spørgsmål
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedOption, onNext]);

  // Nulstil state ved nyt spørgsmål
  useEffect(() => {
    setCounter(8);
    setSelectedOption(null);
    setIsCorrect(null);
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
