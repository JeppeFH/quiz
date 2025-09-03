import styles from "./createUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { createUser, userIsLoading } = useFetchUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Du skal indtaste et navn");
      return;
    }

    const user = await createUser(name.trim());

    if (!user) {
      setError("Der er allerede en bruger med dette navn");
      return;
    }

    localStorage.setItem("userId", user._id);
    localStorage.setItem("username", user.name);

    navigate("/quiz/");
  };

  return (
    <>
      <form className={styles.homeWrapper} onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Indtast navn"
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={userIsLoading}
        />
        <button
          type="submit"
          className={styles.homeBtn}
          disabled={userIsLoading}
        >
          Start Quiz
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};

export default CreateUser;
