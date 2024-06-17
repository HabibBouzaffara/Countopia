import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(token);
  if (!isAuth) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
