import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ChooseLanguage() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState("");

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await supabase
        .from("languages")   // MUST match table name
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching languages:", error);
      } else {
        setLanguages(data);
      }
    };

    fetchLanguages();
  }, []);

  // Save selected language
  async function handleContinue() {
    if (!selectedLanguageId) return;

    const { error } = await supabase
      .from("user_languages")
      .insert({ language_id: selectedLanguageId });

    if (error) {
      console.error("Error saving language:", error);
    } else {
      console.log("Language saved!");
      // navigate to chat later
      onContinue();
    }
  }

  //  ALL JSX MUST BE INSIDE THIS RETURN
  return (
    <div>
      <h2>Choose your language</h2>

      <select
        value={selectedLanguageId}
        onChange={(e) => setSelectedLanguageId(e.target.value)}
      >
        <option value="">Select a language...</option>

        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>

      <button disabled={!selectedLanguageId} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}

export default ChooseLanguage;




