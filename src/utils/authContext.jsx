import { createContext, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

    const navigate = useNavigate();

    const login = (token, expiresIn, access) => {
        localStorage.setItem("isLoggedIn", "true", { expires: 7 });
        localStorage.setItem("authToken", token, { expires: 7 });
        localStorage.setItem("expiresIn", expiresIn, { expires: 7 });
        localStorage.setItem("access", access, { expires: 7 });

        setIsLoggedIn(true);
        navigate("/dashboard", { replace: true });
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("access");

        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
