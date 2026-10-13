import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Input from "../components/InputField/Input";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import indonesiaFlag from "../assets/Indonesia (ID).png";
import { registerUser, verifyEmailToken, getAuthError } from "../services/authApi";
import "./SignIn.css";

function SignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const phone = formData.get("phone").replace(/\D/g, "");
    if (password !== formData.get("confirmPassword")) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }
    setLoading(true);
    try {
      const result = await registerUser({
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        password,
        phoneNumber: `+62${phone.replace(/^0+/, "")}`,
      });
      setVerificationStep(true);
      setError(result.message || "Pendaftaran berhasil. Masukkan token yang dikirim ke emailmu.");
    } catch (requestError) {
      setError(getAuthError(requestError));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await verifyEmailToken(formData.get("verificationToken").trim());
      setVerified(true);
      setError(result.message);
    } catch (requestError) {
      setError(getAuthError(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <Card
        title={verificationStep ? (verified ? "Email Terverifikasi" : "Verifikasi Email") : "Buat Akun"}
        subtitle={verificationStep ? "Masukkan token verifikasi yang dikirim ke emailmu." : "Mulai perjalanan belajarmu bersama videobelajar."}
      >
        {verificationStep ? (
          verified ? (
            <div className="auth-form">
              <p className="auth-success" role="status">{error}</p>
              <Link className="auth-switch" to="/">Lanjut ke <strong>Masuk</strong></Link>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleVerify}>
              <Input label="Token Verifikasi" name="verificationToken" autoComplete="one-time-code" required />
              {error && <p className={error.startsWith("Pendaftaran") ? "auth-success" : "auth-message"} role="status">{error}</p>}
              <div className="button-Container">
                <Button class="primary" type="submit" disabled={loading}>{loading ? "Memverifikasi..." : "Verifikasi Token"}</Button>
              </div>
            </form>
          )
        ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input label="Nama Lengkap" name="name" autoComplete="name" required />
          <Input label="E-Mail" name="email" type="email" autoComplete="email" required />
          <div className="phone-group">
            <label htmlFor="phone">No. Hp <span className="required">*</span></label>
            <div className="phone-wrapper">
              <div className="country-code">
                <span className="flag-button"><img src={indonesiaFlag} alt="" className="flag" /></span>
                <span className="country-prefix">+62</span>
              </div>
              <input type="tel" id="phone" name="phone" autoComplete="tel-national" placeholder="81234567890" inputMode="numeric" pattern="[0-9]{8,13}" title="Masukkan 8 sampai 13 digit nomor telepon" required />
            </div>
          </div>
          <Input label="Kata Sandi" name="password" type="password" autoComplete="new-password" minLength={8} required />
          <Input label="Konfirmasi Kata Sandi" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required />
          {error && <p className="auth-message" role="alert">{error}</p>}
          <div className="button-Container">
            <Button class="primary" type="submit" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</Button>
            <Link className="auth-switch" to="/">Sudah punya akun? <strong>Masuk</strong></Link>
          </div>
        </form>
        )}
      </Card>
    </>
  );
}

export default SignIn;
