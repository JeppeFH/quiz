import { useState } from "react";

export const useFetchUser = () => {
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const fetchUser = async () => {
    setUserIsLoading(true);

    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/users"
      );
      const data = await response.json();
      setUser(data.data);
      return data.data;
    } catch (userError) {
      setUserError("Der skete en fejl");
    } finally {
      setUserIsLoading(false);
    }
  };

  /* Create user */
  const createUser = async (name) => {
    setUserIsLoading(true);
    try {
      const response = await fetch(
        "https://quiz-tpjgk.ondigitalocean.app/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ukendt fejl");
      }

      /* Gemmer token og user-info */
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.data._id);
      localStorage.setItem("username", result.data.name);
      localStorage.setItem("currentIndex", 0);

      setUser(result.data);
      return result.data;
    } catch (userError) {
      console.error(userError);
      setUserError("Kunne ikke oprette bruger");
    } finally {
      setUserIsLoading(false);
    }
  };

  /* Get user by id */
  const fetchUserById = async (id) => {
    setUserIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://quiz-tpjgk.ondigitalocean.app/user/${id}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fejl ved hent af bruger");
      }

      setUser(data.data);
      return data.data;
    } catch (userError) {
      console.error(userError);
      setUserError("Kunne ikke hente bruger");
    } finally {
      setUserIsLoading(false);
    }
  };

  return {
    user,
    userError,
    userIsLoading,
    fetchUser,
    fetchUserById,
    createUser,
  };
};
