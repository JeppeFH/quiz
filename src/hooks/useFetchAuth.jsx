import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useFetchAuth = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [token, setToken] = useState(auth.token || null);
  const [signedIn, setSignedIn] = useState(!!auth.token);
  const [user, setUser] = useState(auth.token ? jwtDecode(auth.token) : null);
  const [error, setError] = useState(null);

  const signIn = async (name) => {
    setError(null);

    try {
      const response = await axios.post(
        "https://quiz-tpjgk.ondigitalocean.app/signin",
        { name }
      );

      const receivedToken = response.data.data.token;
      const decoded = jwtDecode(receivedToken);

      setToken(receivedToken);
      setUser(decoded);
      setSignedIn(true);

      setAuth({ token: receivedToken });
      localStorage.setItem("token", receivedToken);

      return true;
    } catch (error) {
      setError("Login mislykkedes");
      setSignedIn(false);
      setToken(null);
      setUser(null);
      setAuth({});
      return false;
    }
  };

  return { token, signedIn, user, error, signIn };
};
