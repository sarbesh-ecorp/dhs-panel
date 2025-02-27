import { createContext, useContext, useState} from "react";
import { replace, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("isLoggedIn") === "true");

    const navigate = useNavigate();

    const login = (token, expiresIn, access) => {
        Cookies.set("isLoggedIn", "true", { expires: 7 });
        Cookies.set("authToken", token, { expires: 7 });
        Cookies.set("expiresIn", expiresIn, { expires: 7 });
        Cookies.set("access", access, { expires: 7 });

        setIsLoggedIn(true);
        navigate('/dashboard', {replace: true});
    };

    const logout = () => {
        Cookies.remove("isLoggedIn");
        Cookies.remove("authToken");
        Cookies.remove("expiresIn");
        Cookies.remove("access");

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
