import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import Login from "./components/Login";
import ChooseLanguage from "./components/ChooseLanguage";
import EntryList from "./components/EntryList";
import DiaryEditor from "./components/DiaryEditor";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  // ⭐ ADD THIS HERE — inside App(), not at the top of the file
  const [step, setStep] = useState("entries");

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

  // Handle login + language check
  const handleLogin = async (loggedInUser) => {
    console.log("🔵 Logged in user:", loggedInUser);
    console.log("🔵 User ID:", loggedInUser.id);

    setUser(loggedInUser);

    console.log("🔵 Checking language for user:", loggedInUser.id);

    const { data, error } = await supabase
      .from("user_languages")
      .select("*")
      .eq("user_id", loggedInUser.id)
      .maybeSingle();

    console.log("🟣 Language query result:", data);
    console.log("🟣 Language query error:", error);

    if (data) {
      console.log("🟢 User already has a language:", data);
      setHasChosenLanguage(true);
    } else {
      console.log("🟠 User has NO language yet");
      setHasChosenLanguage(false);
    }

    loadEntries(loggedInUser.id);
  };

  // If no user → show login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // If user has NOT chosen a language → show ChooseLanguage
  if (!hasChosenLanguage) {
    return (
      <ChooseLanguage
        user={user}
        onContinue={() => setHasChosenLanguage(true)}
      />
    );
  }


  if (step === "entries") {
    return (
      <EntryList
        entries={entries}
        onNewEntry={() => setStep("editor")}
      />
    );
  }

  if (step === "editor") {
    return (
      <DiaryEditor
        user={user}
        onSave={() => {
          loadEntries(user.id); // reload entries after saving
          setStep("entries");
        }}
      />
    );
  }


}

export default App;
