function EntryList({entries}) {
    return (
        <div>
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