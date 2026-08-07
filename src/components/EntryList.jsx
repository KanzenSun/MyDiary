function EntryList({entries, onNewEntry}) {
    return(
        <div>
            <h2>Your Diary Entries</h2>

            {entries.length === 0 && <p>No entries yet.</p>}

            <button onClick ={onNewEntry}>
                New Entry
            </button>

            {entries.map((entry) => (
                <div key={entry.id}>
                    <p>{entry.content}</p>
                    <small>{entry.created_at}</small>
                </div>
            ))}
        </div>
    );
}

export default EntryList;