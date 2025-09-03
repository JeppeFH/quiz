import { Navigate, useParams } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

const ProtectedRoute = ({ children, requireUser = false }) => {
  const { user } = useFetchUser();
  const { id } = useParams();

  if (requireUser && (!user || user._id !== id)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
