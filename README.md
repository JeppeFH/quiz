# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

npm install chart.js react-chartjs-2

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./statistics.module.css";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/quiz");
        setQuizzes(res.data); // forventer quiz med options + votes
      } catch (err) {
        console.error("Kunne ikke hente quiz data:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.statistics}>
      <h2>Quiz Statistik</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className={styles.quizStat}>
          <h3>{quiz.question}</h3>

          {/* 📊 Tabel */}
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th>Svar</th>
                <th>Antal stemmer</th>
              </tr>
            </thead>
            <tbody>
              {quiz.options.map((opt, idx) => (
                <tr key={opt._id}>
                  <td>{String.fromCharCode(65 + idx)}: {opt.text}</td>
                  <td>{opt.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📊 Søjlediagram */}
          <div className={styles.chartWrapper}>
            <Bar
              data={{
                labels: quiz.options.map((opt, idx) => `${String.fromCharCode(65 + idx)}: ${opt.text}`),
                datasets: [
                  {
                    label: "Stemmer",
                    data: quiz.options.map((opt) => opt.votes),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Svarfordeling" },
                },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;

css:
.statistics {
  margin: 2rem auto;
  max-width: 800px;
  padding: 1rem;
}

.quizStat {
  margin-bottom: 3rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2rem;
}

.statsTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.statsTable th,
.statsTable td {
  border: 1px solid #ddd;
  padding: 8px;
}

.statsTable th {
  background-color: #f4f4f4;
}

.chartWrapper {
  margin-top: 1.5rem;
}

quizcard:
import { useEffect, useState } from "react";
import styles from "./quizCard.module.css";
import axios from "axios";

const QuizCard = ({ quiz, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [counter, setCounter] = useState(8);

  // Håndterer svar
  const handleAnswer = async (optionId) => {
    setSelectedOption(optionId);
    setIsCorrect(optionId === quiz.correctOptionId);

    try {
      const userId = localStorage.getItem("userId");

      // Send svaret til backend
      await axios.post(`http://localhost:3000/quiz/${quiz._id}/answer`, {
        optionId,
        userId,
      });
    } catch (err) {
      console.error("Kunne ikke gemme svar:", err);
    }
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
