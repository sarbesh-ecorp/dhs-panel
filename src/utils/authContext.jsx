import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("isLoggedIn") === "true"); // ✅ Initialize from cookie

    const navigate = useNavigate();

    const login = (token, userId) => {
        Cookies.set("isLoggedIn", "true", { expires: 7 });
        Cookies.set("authToken", token, { expires: 7 });
        Cookies.set("userID", userId, { expires: 7 });

        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const logout = () => {
        Cookies.remove("isLoggedIn");
        Cookies.remove("authToken");
        Cookies.remove("userID");

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
