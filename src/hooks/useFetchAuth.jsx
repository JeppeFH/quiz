import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useFetchAuth = () => {
  const [auth, setAuth] = useLocalStorage("auth", {}); // hook gemmer og henter data fra localStorage, så det "overlever" side-genindlæsning.
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(auth.token || null);
  const [signedIn, setSignedIn] = useState(!!auth.token); // Hvis der er en token i localStorage (auth.token findes), så: setSignedIn(true) hvis ikke (false)
  const [user, setUser] = useState(auth.token ? jwtDecode(auth.token) : null); // måden systemet "husker" ens bruger, efter en sideopdatering
  const [error, setError] = useState(null);

  /* SignIn funktion der sender username til serveren for at få et token. */
  const signIn = async () => {
    setError(null);

    try {
      const response = await axios.post(
        "https://quiz-tpjgk.ondigitalocean.app/signin",
        { username }
      );

      const receivedToken = response.data.data.token; // Henter token ud af response fra serveren
      const decoded = jwtDecode(receivedToken); // Bruger jwt-decode-biblioteket til at dekode token’en, så man kan se info om brugeren.

      setToken(receivedToken); // Gemmer token i lokal state
      setUser(decoded); // Gemmer de dekodede brugeroplysninger i user.
      setSignedIn(true);
      setAuth({ token: receivedToken }); // Gemmer token’en i localStorage, så brugeren forbliver inde, selv hvis siden genindlæses.
    } catch (error) {
      setError("Login mislykkedes");
      setSignedIn(false);
      setToken(null);
      setUser(null);
      setAuth({});
    }
  };

  return { username, setUsername, token, signedIn, user, error, signIn };
};
