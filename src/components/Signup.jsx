import { useState } from "react";
import {supabase } from "../utils/supabaseClient";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async () => {
        console.log("Supabase client in Signup:", supabase);
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Check your email for confirmation!");
        }
    };

    return (
        <div>
        <h2>Sign Up</h2>

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

        <button onClick={handleSignup}>Create Account</button>

        <p>{message}</p>
        </div>
    );
}

export default Signup;