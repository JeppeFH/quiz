import { useEffect, useState } from "react";
import styles from "./rememberMe.module.css";
import { useNavigate } from "react-router-dom";

const RememberMe = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedIndex = localStorage.getItem("currentIndex");

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
      setCurrentIndex(storedIndex ? parseInt(storedIndex, 10) : 0);
    }
  }, []);

  const handleContinue = () => {
    if (!userId) return;

    navigate(`/quiz/${userId}`);
  };

  /* Hvis der ikke er gemt nogen bruger, vises knap ikke */
  if (!userId) return null;

  return (
    <>
      <button className={styles.rememberMeBtn} onClick={handleContinue}>
        Spil videre som {username}
      </button>
    </>
  );
};

export default RememberMe;
