import { useEffect, useState } from "react";

export const useFetchQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [quizError, setQuizError] = useState(null);
  const [quizIsLoading, setQuizIsLoading] = useState(false);

  const fetchQuiz = async () => {
    setQuizIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/quiz");
      const data = await response.json();
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
      const response = await fetch(`http://localhost:3000/quiz/${id}`);
      const data = await response.json();
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
    quizError,
    quizIsLoading,
    fetchQuiz,
    fetchQuizById,
  };
};
