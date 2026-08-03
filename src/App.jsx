import { useState } from "react";
import DiaryEditor from "./components/DiaryEditor";
import EntryList from "./components/EntryList";

//Adding in the new stuff from supabase
import Login from "./components/Login";
import Signup from "./components/Signup";
import { supabase } from "./utils/supabaseClient";

function App() {
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setUser(loggedInUser);
    loadEntries(loggedInUser.id);
  };

  const loadEntries = async (userId) => {
    const {data,error} = await supabase
    .from("diary_entries")
    .select("*")
    .eq("user_id", userId);

    console.log("Loading entries for user:", userId);
    console.log("Load error:", error);
    console.log("Load data:", data);

    if (!error) {
      setEntries(data);
    }
  };

  const saveEntry = async (text) => {
    //Debugging the start
    console.log("saveEntry() called");
    console.log("User object:", user);
    console.log("User ID:", user?.id);
    console.log("Entry text:", text);


    const {data,error} = await supabase
    .from("diary_entries")
    .insert([{ content: text, user_id: user.id }])
    .select(); //makes it so Supabase returns the new row!

    if (error) {
      console.log("Save error:", error); //Debugs Supabase error
      return;
    }

    console.log("Save success:", data); //Debugs successful insert

      setEntries((prev) => [...prev, data[0]]); // Updates the state immediately!

      //await loadEntries(user.id); //Reloads from Supabase!
    };
  

  if (!user) {
    return (
      <div>
        <Signup />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return(
    <div>
      <h1>My Diary</h1>
      <DiaryEditor onSave={saveEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;




// Old original code!!!!!
//function App() {
  //const [ entries, setEntries] = useState ([]);

  //const handleSave = (newEntry) => {
    //setEntries([...entries, newEntry]);
  //};

  //return (
    //<div>
      //<h1>My Diary</h1>
      //<DiaryEditor onSave={handleSave} />
      //<EntryList entries={entries} />
    //</div>
  //);
//}

//export default App;