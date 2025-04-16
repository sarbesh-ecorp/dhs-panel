import { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
      document.documentElement.style.setProperty('--header-width', '0px');
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
      if (!username || !password) {
          setValidated(true);
          return;
      }
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", { username, password });
      if (response.status === 200) {
        login(response.data.token, response.data.expiresIn, response.data.access);
      }
    } catch (error) {
        alert(error.message)
    } finally {
        setLoading(false);
    }
    
  };

  return (
  <div className="mainContent d-flex align-items-center justify-content-center vh-100 bg-light login-background">
    <div className="card shadow p-4 rounded" style={{ width: "400px" }}>
      <div className="card-body">
        <img 
        src="/dhs-panel/assets/logo.svg" 
        alt="DHS Logo" 
        style={{ width: "60px", height: "80px" }} 
        className="mb-2 mx-auto d-block"
      />
        <h3 className="text-center mb-4">DHS Admin CRM Login</h3>
        <form noValidate onSubmit={handleLogin} className={validated ? "was-validated" : ""}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username.trim()}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="invalid-feedback">Username is required.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password.trim()}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="invalid-feedback">Password is required.</div>
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'please wait' : 'Login'}</button>
        </form>
      </div>
    </div>
  </div>
  );
}
