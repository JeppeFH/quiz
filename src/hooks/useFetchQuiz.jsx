import { useEffect, useState } from "react";

export const useFetchQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [quizError, setQuizError] = useState(null);
  const [quizIsLoading, setQuizIsLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  /* Fetch all quizzes */
  const fetchQuiz = async () => {
    setQuizIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/quiz",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fejl ved hentning af quizzer");
      }

      console.log("Fetch all quizzes", data);
      setQuiz(data.data);
      return data.data;
    } catch (quizError) {
      console.error(quizError);
      setQuizError("Kunne ikke hente quizzer");
    } finally {
      setQuizIsLoading(false);
    }
  };

  /* Get quiz by id */
  const fetchQuizById = async (id) => {
    setQuizIsLoading(true);

    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/quiz/${id}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const data = await response.json();

      console.log("Fetch quiz by id", data);

      return data.data;
    } catch (quizError) {
      console.error(quizError);
      setQuizError("Kunne ikke hente quiz med id");
    } finally {
      setQuizIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return {
    quiz,
    error: quizError,
    isLoading: quizIsLoading,
    fetchQuiz,
    fetchQuizById,
  };
};
