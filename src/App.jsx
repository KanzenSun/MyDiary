import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Login from "./components/Login";
import ChooseLanguage from "./components/ChooseLanguage";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(true); // default true until we check

  // Load diary entries
  const loadEntries = async (userId) => {
    const { data, error } = await supabase
      .from("diary_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading entries:", error);
    } else {
      setEntries(data);
    }
  };

  //  Handle login + language check
  const handleLogin = async (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser);

    //  CHECK IF USER ALREADY CHOSE A LANGUAGE
    const { data, error } = await supabase
      .from("user_languages")
      .select("*")
      .eq("user_id", loggedInUser.id)
      .maybeSingle();

    if (error) {
      console.log("Language check error:", error);
    }

    if (data) {
      console.log("User already has a language:", data);
      setHasChosenLanguage(true);
    } else {
      console.log("User has no language yet");
      setHasChosenLanguage(false);
    }

    // Load diary entries AFTER language check
    loadEntries(loggedInUser.id);
  };

  // If no user → show login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // If user has NOT chosen a language > show ChooseLanguage
  if (!hasChosenLanguage) {
    return (
      <ChooseLanguage
        user={user}
        onContinue={() => setHasChosenLanguage(true)}
      />
    );
  }

  // Otherwise show diary entries
  return (
    <div>
      <h2>Your Diary Entries</h2>

      {entries.length === 0 && <p>No entries yet.</p>}

      {entries.map((entry) => (
        <div key={entry.id}>
          <p>{entry.content}</p>
          <small>{entry.created_at}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
