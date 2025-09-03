import { useEffect, useState } from "react";
import styles from "./rememberMe.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

const RememberMe = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { user } = useFetchUser();
  const { _id } = useParams();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("userId", user._id);
    localStorage.setItem("username", user.name);

    navigate(`/quiz/${_id}`);
  };

  return (
    <>
      <button className={styles.rememberMeBtn} onClick={handleSubmit}>
        Spil videre som {username}
      </button>
    </>
  );
};

export default RememberMe;
