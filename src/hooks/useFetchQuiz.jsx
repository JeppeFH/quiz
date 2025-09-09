import { useEffect, useState } from "react";

export const useFetchQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [quizError, setQuizError] = useState(null);
  const [quizIsLoading, setQuizIsLoading] = useState(false);

  const fetchQuiz = async () => {
    setQuizIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/quiz"
      );
      const data = await response.json();
      console.log("Fetch all quizzes", data);
      setQuiz(data.data);
      return data.data;
    } catch (quizError) {
      setQuizError("Der skete en fejl");
    } finally {
      setQuizIsLoading(false);
    }
  };

  // Get quiz by id
  const fetchQuizById = async (id) => {
    setQuizIsLoading(true);

    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/quiz/${id}`
      );
      const data = await response.json();
      console.log("Fetch quiz by id", data);
      return data.data;
    } catch (quizError) {
      setQuizError("Der skete en fejl");
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
