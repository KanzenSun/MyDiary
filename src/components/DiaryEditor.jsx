import { useState } from "react";

function DiaryEditor({ onSave }) {
    const [text, setText] = useState("");

    const handleSave = () => {
        if (text.trim() === "") return;
        onSave(text);
        setText("");
    };

    return(
        <div>
            <textarea
            value={text}
            onChange = {(e) => setText(e.target.value)}
            placeholder = "What's on your mind...?"
            />
            <button onClick = {handleSave}>Save Entry</button>
        </div>
    );
}

export default DiaryEditor;