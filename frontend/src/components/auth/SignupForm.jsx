import React, { useState } from "react";
import { register } from "../../services/api";

// Password strength scorer
const scorePassword = (pw) => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 6)                        score++;
  if (pw.length >= 10)                       score++;
  if (/[A-Z]/.test(pw))                      score++;
  if (/[0-9]/.test(pw))                      score++;
  if (/[^A-Za-z0-9]/.test(pw))              score++;
  const map = [
    { label: "",          color: "" },
    { label: "Weak",      color: "#EF4444" },
    { label: "Fair",      color: "#F59E0B" },
    { label: "Good",      color: "#3B82F6" },
    { label: "Strong",    color: "#1D9E75" },
    { label: "Very strong", color: "#059669" },
  ];
  return { score, ...map[score] };
};

const SignupForm = ({ onSwitch }) => {
  const [form,    setForm]    = useState({ full_name: "", email: "", password: "" });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const pw = scorePassword(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.full_name.trim()) { setError("Please enter your full name.");            return; }
    if (!form.email.trim())     { setError("Please enter a valid email.");             return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      await register(form);
      setSuccess("Account created! You can now log in.");
      setForm({ full_name: "", email: "", password: "" });
      // Auto-switch to login after 1.5 s
      setTimeout(() => onSwitch(), 1500);
    } catch (err) {
      const msg = err?.response?.data?.detail;
      setError(msg || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>

      {error   && <div className="auth-error">  <span>⚠️</span> {error}   </div>}
      {success && <div className="auth-success"> <span>✅</span> {success} </div>}

      <div className="auth-field">
        <label className="auth-label">Full Name</label>
        <input
          className="auth-input"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          value={form.full_name}
          onChange={e => { setForm({ ...form, full_name: e.target.value }); setError(""); }}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={e => { setForm({ ...form, email: e.target.value }); setError(""); }}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          value={form.password}
          onChange={e => { setForm({ ...form, password: e.target.value }); setError(""); }}
        />
        {/* Password strength bar */}
        {form.password && (
          <div>
            <div className="pw-track">
              <div
                className="pw-fill"
                style={{
                  width: `${(pw.score / 5) * 100}%`,
                  background: pw.color,
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: pw.color, marginTop: 5, fontWeight: 600 }}>
              {pw.label}
            </div>
          </div>
        )}
      </div>

      <button className="auth-btn" type="submit" disabled={loading}>
        {loading ? <><div className="auth-spinner"/> Creating account…</> : "Create Account"}
      </button>

      <div className="auth-switch">
        Already have an account?
        <button type="button" onClick={onSwitch}>Login</button>
      </div>
    </form>
  );
};

export default SignupForm;