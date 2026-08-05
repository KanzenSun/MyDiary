import { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";
import EntryList from "./components/EntryList";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { supabase } from "./utils/supabaseClient";
import ChooseLanguage from "./components/ChooseLanguage";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser);
    loadEntries(loggedInUser.id);
  };

  const loadEntries = async (userId) => {
    const { data, error } = await supabase
      .from("diary_entries")
      .select("*")
      .eq("user_id", userId);

    if (!error) {
      setEntries(data);
    }
  };

  const saveEntry = async (text) => {
    const { data, error } = await supabase
      .from("diary_entries")
      .insert([{ content: text, user_id: user.id }])
      .select();

    if (!error) {
      setEntries((prev) => [...prev, data[0]]);
    }
  };

  //  If user is NOT logged in > show login/signup
  if (!user) {
    return (
      <div>
        <Signup />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  //  If user IS logged in but has NOT chosen a language > show ChooseLanguage
  if (!hasChosenLanguage) {
    return (
      <ChooseLanguage
        onContinue={() => setHasChosenLanguage(true)}
      />
    );
  }

  //  If user IS logged in AND has chosen a language > show diary
  return (
    <div>
      <h1>My Diary</h1>
      <DiaryEditor onSave={saveEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;