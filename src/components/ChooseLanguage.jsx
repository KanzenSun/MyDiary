import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function ChooseLanguage({ user, onContinue }) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState("");

  // Load languages from Supabase
  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await supabase
        .from("languages")
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

  // ⭐ THIS is the part you were missing
  async function handleContinue() {
    if (!selectedLanguageId) return;

    const { error } = await supabase
      .from("user_languages")
      .insert({
        user_id: user.id,               //  REQUIRED
        language_id: selectedLanguageId //  REQUIRED
      });

    if (error) {
      console.error("Error saving language:", error);
    } else {
      console.log("Language saved!");
      onContinue(); // tells App.jsx to move forward
    }
  }

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
