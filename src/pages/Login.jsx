import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/InputField/Input";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import { loginUser, getAuthError } from "../services/authApi";
import { getSession, saveSession } from "../utils/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (getSession()?.token) return <Navigate to="/home" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const session = await loginUser({
        email: formData.get("email").trim(),
        password: formData.get("password"),
      });
      saveSession(session);
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(getAuthError(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <Card title="Masuk ke Akun" subtitle="Yuk, lanjutin belajarmu di videobelajar.">
        <form className="auth-form" onSubmit={handleSubmit}>
          {location.state?.message && <p className="auth-success" role="status">{location.state.message}</p>}
          <Input name="email" type="email" label="E-Mail" autoComplete="email" required />
          <Input name="password" type="password" label="Kata Sandi" autoComplete="current-password" required />
          {error && <p className="auth-message" role="alert">{error}</p>}
          <div className="forgot-password"><button type="button" disabled>Lupa Password?</button></div>
          <div className="button-Container">
            <Button class="primary" type="submit" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
            <Link className="auth-switch" to="/register">Belum punya akun? <strong>Daftar</strong></Link>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Login;
