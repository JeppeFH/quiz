import { useEffect, useState } from "react";

export const useFetchUser = () => {
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const fetchUser = async () => {
    setUserIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/user");
      const data = await response.json();
      setUser(data.data);
      return data.data;
    } catch (userError) {
      setUserError("Der skete en fejl");
    } finally {
      setUserIsLoading(false);
    }
  };

  // Create user
  const createUser = async (name) => {
    setUserIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ukendt fejl");
      }

      return result.data;
    } catch (userError) {
      console.log(userError);
    } finally {
      setUserIsLoading(false);
    }
  };

  // Get user by id
  const fetchUserById = async (id) => {
    setUserIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`);
      const data = await response.json();
      return data.data;
    } catch (userError) {
      setUserError("Der skete en fejl");
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
