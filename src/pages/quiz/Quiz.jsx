import styles from "./quiz.module.css";
import QuizCard from "../../components/quizCard/QuizCard";
import Statistics from "../../components/statistics/Statistics";
import { useFetchQuiz } from "../../hooks/useFetchQuiz";
import { useEffect, useState } from "react";

const Quiz = () => {
  const { quiz, isLoading, error } = useFetchQuiz();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);

  /* Når quiz loader første gang, tjek localStorage efter "currentIndex" */
  /* Hvis storedIndex findes så brug tallet, ellers start fra 0 */
  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    const storedIndex = localStorage.getItem("currentIndex");

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
      setCurrentIndex(storedIndex ? parseInt(storedIndex, 10) : 0);
    }
  }, []);

  /* UseEffect der gør at brugeren gemmer sine fremskridt bruges til RememberMe.jsx */
  useEffect(() => {
    localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

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
              setCurrentIndex(quiz.length); // Når man er færdig med sidste spørgsmål, sæt currentIndex = quiz.length
            }
          }}
        />
      ) : (
        <div className={styles.finishedQuiz}>
          <p>Tak for at deltage i Quiz.</p>
          <p>Gå til {quiz.hint} for at fortsætte quizzen.</p>

          <Statistics />
        </div>
      )}
    </section>
  );
};

export default Quiz;
