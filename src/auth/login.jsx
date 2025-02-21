import { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
      document.documentElement.style.setProperty('--header-width', '0px');
    }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    login("sampleAuthToken", "12345");
  };

  return (
    <div className="mainContent d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4 rounded" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
