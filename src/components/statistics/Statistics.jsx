import styles from "./statistics.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Statistics = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quiz");
        setQuizzes(response.data.data);
      } catch (error) {
        console.log("Kunne ikke hente quiz data", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <section className={styles.statistics}>
        <h2>Mest populære svar</h2>
        <h3>Hvad svarede andre brugere?</h3>
        {quizzes.map((quiz) => (
          <div className={styles.statisticsWrapper}>
            <h4>{quiz.question}</h4>
            {/* Tabel */}
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
                    <td>
                      {String.fromCharCode(65 + idx)}: {opt.text}
                    </td>
                    <td>{opt.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </>
  );
};

export default Statistics;
