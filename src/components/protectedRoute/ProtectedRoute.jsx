// ProtectedRoute.jsx
import { Navigate, useParams } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

const ProtectedRoute = ({ children, requireUser = false }) => {
  const { user, userIsLoading } = useFetchUser();
  const { id } = useParams();

  const storedUserId = localStorage.getItem("userId");

  if (userIsLoading) {
    return <p>Checker bruger...</p>;
  }

  // Hvis der kræves en bruger, og ingen matcher
  if (requireUser && (!user || user._id !== id)) {
    // tillad adgang hvis id'et i URL matcher det i localStorage
    if (storedUserId && storedUserId === id) {
      return children;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
