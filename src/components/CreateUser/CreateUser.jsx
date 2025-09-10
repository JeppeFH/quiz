import styles from "./createUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useFetchAuth } from "../../hooks/useFetchAuth";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { createUser } = useFetchUser();
  const { signIn, error: authError } = useFetchAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Du skal indtaste et navn");
      return;
    }

    /* Opretter bruger */
    const createdUser = await createUser(name.trim());
    if (!createdUser) {
      setError("Kunne ikke oprette bruger – måske navnet findes allerede");
      return;
    }

    /* Logger ind for at få token */
    const success = await signIn(name.trim());
    if (!success) {
      setError("Der skete en fejl ved login");
      return;
    }

    /* Gem i localStorage til quiz */
    localStorage.setItem("username", createdUser.name);
    localStorage.setItem("userId", createdUser._id);
    localStorage.setItem("currentIndex", 0);

    navigate("/quiz");
  };

  return (
    <form className={styles.homeWrapper} onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="Indtast navn"
        minLength={2}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className={styles.homeBtn}>
        Start Quiz
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default CreateUser;
