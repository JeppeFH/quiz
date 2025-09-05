import styles from "./statistics.module.css";

const BarChart = ({ options }) => {
  /* Finder største antal stemmer fra options (svar) for at kunne skalere søljernes højde */
  const maxVotes = Math.max(...options.map((opt) => opt.votes), 1);

  /* Intervallet mellem y-aksens votes-antal,  */
  const interval = maxVotes <= 10 ? 1 : Math.ceil(maxVotes / 10);

  const yAxisVotes = [];

  /* Starter fra største antal maxVotes og tæler ned til 0. Tilføjer hvert tal til yAxisVotes  */
  for (let i = 0; i <= maxVotes; i += interval) {
    yAxisVotes.push(i);
  }

  return (
    <div className={styles.barChart}>
      {/* Y-akse */}
      <div className={styles.yAxis}>
        {yAxisVotes.reverse().map((y) => (
          <label key={y} className={styles.yAxisLabel}>
            {y}
          </label>
        ))}
      </div>

      {/* Søjler */}
      <div className={styles.bars}>
        {options.map((opt) => {
          const heightPercent = (opt.votes / maxVotes) * 100;
          return (
            <div key={opt._id} className={styles.barItem}>
              <div
                className={styles.bar}
                style={{ height: `${heightPercent}%` }}
              ></div>
              <label className={styles.barLabel}>{opt.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
