import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function DiaryEditor({user, onSave}) {
    const [content, setContent] = useState("");

    async function handleSave() {
        const {error} = await supabase
        .from("diary_entries")
        .insert({
            user_id: user.id,
            content
        });

        if (error) {
            console.error("Error saving entry:", error);
        } else {
            console.log("Entry saved!");
            onSave();
        }
    }

    return (
        <div>
            <h2>Write a new entry</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind...?"
                rows={10}
                cols={50}
                />

            <button onClick={handleSave}>Save Entry</button>    
            </div>
    );
}

export default DiaryEditor;