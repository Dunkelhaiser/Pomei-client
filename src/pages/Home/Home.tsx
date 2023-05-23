import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import { NotesContext } from "../../context/NotesContext";
import { UserContext } from "../../context/UserContext";
import HomeStyles from "./Home.module.scss";
import Text from "../../components/Text/Text";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { notes } = useContext(NotesContext);
    const sortedNotes = [...notes].sort(
        (a, b) => new Date(b.modificationDate || b.date).getTime() - new Date(a.modificationDate || a.date).getTime()
    );
    return (
        <Layout title="Home">
            <div className={HomeStyles.heading}>
                <h2>Latest Notes</h2>
                <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} onClick={() => navigate("/create_note")} />
            </div>
            <section className={HomeStyles.layout}>
                {sortedNotes.map((note) => (
                    <Card
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        content={note.content}
                        date={note.modificationDate || note.date}
                        textLimit={100}
                    />
                ))}
                {notes.length < 1 && <Text text="No notes found." type="p" />}
            </section>
            {user.loggedIn && (
                <>
                    <div className={HomeStyles.heading}>
                        <h2>Latest Folders</h2>
                        <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} />
                    </div>
                    <section className={HomeStyles.layout}>
                        <Folder title="My Folder" />
                        <Folder title="Homework" color="purple" />
                        <Folder title="Secret" color="green" />
                        <Folder title="Copy" />
                    </section>
                </>
            )}
        </Layout>
    );
};
export default Home;
