import {useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

type StartupNotesProps = {
    startupId: number;
    notes: string[];
    onNoteAdded: (note: string) => void;
    onNoteDeleted: (note: string) => void;
};

function StartupNotes({startupId, notes, onNoteAdded, onNoteDeleted}: StartupNotesProps) {
    const [addingNote, setAddingNote] = useState(false);
    const [deletingMode, setDeletingMode] = useState(false);
    const [newNote, setNewNote] = useState("");

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        try {
            await axios.post(`/api/v1/startup/${startupId}/notes`, {note: newNote});
            onNoteAdded(newNote);
            setNewNote("");
            setAddingNote(false);
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    const handleDeleteNote = async (note: string) => {
        try {
            await axios.delete(`/api/v1/startup/${startupId}/notes`, {data: {note}});
            onNoteDeleted(note);
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    const handleCancelAdd = () => {
        setAddingNote(false);
        setNewNote("");
    };

    return (
        <>
            <ul className="list-unstyled mb-2">
                {notes.map((note, index) => (
                    <li key={index} className="d-flex justify-content-between align-items-center mb-1">
                        <span>• {note}</span>
                        {deletingMode && (
                            <button
                                type="button"
                                className='btn btn-sm btn-outline-danger'
                                onClick={() => handleDeleteNote(note)}
                                aria-label="Delete note"
                            >
                                -
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {addingNote ? (
                <div className="d-flex gap-2 mt-2">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a note..."
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddNote();
                            if (e.key === 'Escape') handleCancelAdd();
                        }}
                    />
                    <Button size="sm" variant="success" onClick={handleAddNote}>
                        Save
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={handleCancelAdd}>
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className="d-flex gap-2 mt-1">
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                            setAddingNote(true);
                            setDeletingMode(false);
                        }}
                    >
                        + Add Note
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm ${deletingMode ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => setDeletingMode(prev => !prev)}
                    >
                        {deletingMode ? 'Done' : '- Delete Note'}
                    </button>
                </div>
            )}
        </>
    );
}

export default StartupNotes;