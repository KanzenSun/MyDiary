import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "signup"

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Login data:", data);
    console.log("Login error:", error);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Logged in!");
      onLogin(data.user);
    }
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("Signup data:", data);
    console.log("Signup error:", error);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created! Check your email.");
      onLogin(data.user);
    }
  };

  return (
    <div>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "login" ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleSignup}>Create Account</button>
      )}

      <p>{message}</p>

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}

export default Login;
