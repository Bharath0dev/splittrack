import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-root {
    --green:#1D9E75; --green-light:#E1F5EE; --green-mid:#b8e8d4;
    --red:#D85A30;   --red-light:#FFF0EB;
    --bg:#F4F6F9; --border:#E8ECF0; --text:#1A1D23;
    --muted:#6B7280; --subtle:#9CA3AF;
    font-family:'DM Sans',sans-serif;
    min-height:100vh;
    background:var(--bg);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  }

  /* ── Card ── */
  .auth-card {
    background:white;
    border-radius:20px;
    border:1px solid var(--border);
    box-shadow:0 8px 48px rgba(0,0,0,.07);
    width:100%;
    max-width:420px;
    overflow:hidden;
    animation:authSlideUp .3s ease both;
  }

  /* ── Header ── */
  .auth-header {
    padding:32px 32px 24px;
    text-align:center;
    border-bottom:1px solid var(--border);
  }
  .auth-logo {
    font-size:26px; font-weight:700; color:var(--green);
    letter-spacing:-.5px; margin-bottom:4px;
  }
  .auth-logo span { color:var(--text); }
  .auth-tagline { font-size:13px; color:var(--muted); }

  /* ── Tabs ── */
  .auth-tabs {
    display:flex;
    background:var(--bg);
    margin:0 24px 0;
    border-radius:10px;
    padding:3px;
    gap:3px;
    margin-top:20px;
  }
  .auth-tab {
    flex:1; padding:9px; border:none; border-radius:8px;
    font-size:14px; font-weight:600; cursor:pointer;
    font-family:'DM Sans',sans-serif;
    background:none; color:var(--muted);
    transition:all .2s;
  }
  .auth-tab.active {
    background:white;
    color:var(--green);
    box-shadow:0 1px 4px rgba(0,0,0,.08);
  }

  /* ── Body ── */
  .auth-body { padding:24px 32px 32px; }

  /* ── Fields ── */
  .auth-field { margin-bottom:16px; }
  .auth-field:last-of-type { margin-bottom:0; }
  .auth-label {
    display:block; font-size:11px; font-weight:700;
    color:var(--muted); text-transform:uppercase;
    letter-spacing:.5px; margin-bottom:7px;
  }
  .auth-input {
    width:100%; padding:11px 14px;
    border:2px solid var(--border); border-radius:10px;
    font-size:14px; font-family:'DM Sans',sans-serif;
    outline:none; transition:border-color .15s;
    background:white; color:var(--text);
  }
  .auth-input:focus { border-color:var(--green); }
  .auth-input.error { border-color:var(--red); }

  /* ── Error message ── */
  .auth-error {
    font-size:12px; color:var(--red); font-weight:500;
    background:var(--red-light); border-radius:8px;
    padding:9px 12px; margin-bottom:16px;
    display:flex; align-items:center; gap:6px;
  }

  /* ── Success message ── */
  .auth-success {
    font-size:12px; color:var(--green); font-weight:500;
    background:var(--green-light); border-radius:8px;
    padding:9px 12px; margin-bottom:16px;
    display:flex; align-items:center; gap:6px;
  }

  /* ── Submit button ── */
  .auth-btn {
    width:100%; padding:13px;
    background:var(--green); color:white; border:none;
    border-radius:10px; font-size:15px; font-weight:700;
    cursor:pointer; font-family:'DM Sans',sans-serif;
    transition:opacity .15s; margin-top:20px;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .auth-btn:hover   { opacity:.9; }
  .auth-btn:active  { opacity:.8; transform:scale(.99); }
  .auth-btn:disabled{ opacity:.55; cursor:not-allowed; }

  /* ── Footer switch ── */
  .auth-switch {
    text-align:center; margin-top:18px;
    font-size:13px; color:var(--muted);
  }
  .auth-switch button {
    border:none; background:none; color:var(--green);
    font-weight:700; font-size:13px; cursor:pointer;
    font-family:'DM Sans',sans-serif; padding:0; margin-left:4px;
  }
  .auth-switch button:hover { text-decoration:underline; }

  /* ── Password strength ── */
  .pw-track {
    height:4px; background:var(--border); border-radius:10px;
    overflow:hidden; margin-top:8px;
  }
  .pw-fill { height:100%; border-radius:10px; transition:width .3s, background .3s; }

  /* ── Spinner ── */
  .auth-spinner {
    display:inline-block; width:16px; height:16px;
    border:2px solid rgba(255,255,255,.4);
    border-top-color:white; border-radius:50%;
    animation:spin .6s linear infinite;
  }

  @keyframes spin       { to { transform:rotate(360deg); } }
  @keyframes authSlideUp {
    from { opacity:0; transform:translateY(20px) scale(.98); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  @media(max-width:480px) {
    .auth-root  { padding:12px; align-items:flex-start; padding-top:40px; }
    .auth-card  { border-radius:16px; }
    .auth-header{ padding:24px 20px 20px; }
    .auth-body  { padding:20px 20px 28px; }
    .auth-tabs  { margin:0 20px 0; }
  }
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <style>{css}</style>
      <div className="auth-root">
        <div className="auth-card">

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">Split<span>Track</span></div>
            <div className="auth-tagline">Split bills · Track personal expenses</div>

            {/* Tabs */}
            <div className="auth-tabs">
              <button className={`auth-tab${isLogin ? " active" : ""}`} onClick={() => setIsLogin(true)}>Login</button>
              <button className={`auth-tab${!isLogin ? " active" : ""}`} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>
          </div>

          {/* Form body */}
          <div className="auth-body">
            {isLogin
              ? <LoginForm onSwitch={() => setIsLogin(false)} />
              : <SignupForm onSwitch={() => setIsLogin(true)} />
            }
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthPage;