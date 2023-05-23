import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import { NotesContext } from "../../context/NotesContext";
import Text from "../../components/Text/Text";

const Notes = () => {
    const navigate = useNavigate();
    const { notes } = useContext(NotesContext);
    return (
        <Layout title="Notes" controls={<FontAwesomeIcon icon={faPlus} onClick={() => navigate("/create_note")} />} type="masonry">
            {notes.map((note) => (
                <Card
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    content={note.content}
                    date={note.modificationDate || note.date}
                    textLimit={400}
                />
            ))}
            {notes.length < 1 && <Text text="No notes found." type="p" />}
        </Layout>
    );
};
export default Notes;
