import styles from "./quiz.module.css";
import QuizCard from "../../components/quizCard/QuizCard";
import { useFetchQuiz } from "../../hooks/useFetchQuiz";
import { useEffect, useState } from "react";

const Quiz = () => {
  const { quiz, isLoading, error } = useFetchQuiz();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  if (isLoading) return <p>Indlæser quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz || quiz.length === 0) return <p>Ingen quiz fundet</p>;

  return (
    <section className={styles.quiz}>
      <h1>
        Velkommen til <br /> Medieskolernes Quiz
      </h1>
      <label className={styles.usernameLabel}>{username}</label>

      {currentIndex < quiz.length ? (
        <QuizCard
          key={quiz[currentIndex]._id}
          quiz={quiz[currentIndex]}
          onNext={() => {
            if (currentIndex + 1 < quiz.length) {
              setCurrentIndex(currentIndex + 1);
            } else {
              // Når vi er færdige med sidste spørgsmål, sæt currentIndex = quiz.length
              setCurrentIndex(quiz.length);
            }
          }}
        />
      ) : (
        <div className={styles.finishedQuiz}>
          <p>Quiz færdig</p>
          <p>Gå til fløjen ved foto-uddannelsen for at finde næste quiz.</p>
        </div>
      )}
    </section>
  );
};

export default Quiz;
