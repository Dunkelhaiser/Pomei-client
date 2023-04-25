import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import { NotesContext } from "../../context/NotesContext";

const Notes = () => {
    const navigate = useNavigate();
    const { notes } = useContext(NotesContext);
    return (
        <Layout title="Notes" controls={<FontAwesomeIcon icon={faPlus} onClick={() => navigate("/create_note")} />} type="masonry">
            {notes.map((note) => (
                <Card key={uuid()} id={note.id} title={note.title} content={note.content} date={note.date} textLimit={400} />
            ))}
            {notes.length < 1 && <p>No notes found.</p>}
        </Layout>
    );
};
export default Notes;
