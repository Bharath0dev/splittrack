import React, { useState } from "react";
import { register } from "../../services/api";

const SignupForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Signup successful, now login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;