import styles from "./statistics.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";

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
          <div key={quiz._id} className={styles.chartWrapper}>
            <h4>{quiz.question}</h4>
            <BarChart options={quiz.options} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Statistics;
