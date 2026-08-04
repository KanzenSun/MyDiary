import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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

    return (
        <div>
            <h2>Login</h2>

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

            <button onClick={handleLogin}>Login</button>

            <p>{message}</p>
        </div>
    );
}

export default Login;