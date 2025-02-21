import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn === undefined) {
        return null;
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
