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

  const handleNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (isLoading) return <p>Indlæser quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz || quiz.length === 0) return <p>Ingen quiz fundet</p>;

  return (
    <>
      <section className={styles.quiz}>
        <h1>
          Velkommen til <br /> Medieskolernes Quiz
        </h1>
        <label className={styles.usernameLabel}>{username}</label>

        <QuizCard
          key={quiz[currentIndex]._id}
          quiz={quiz[currentIndex]}
          onNext={handleNextQuestion}
        />
      </section>
    </>
  );
};

export default Quiz;
