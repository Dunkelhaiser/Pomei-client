import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { truncate } from "../../utils/truncate/truncate";
import CardStyles from "./Card.module.scss";
import ContextMenu from "../ContextMenu/ContextMenu";
import useToggle from "../../hooks/useToggle/useToggle";
import { UserContext } from "../../context/UserContext";
import { NotesContext } from "../../context/NotesContext";

interface Props {
    title?: string;
    content?: string;
    date: string;
    id: string;
    textLimit?: number;
}

const Card: React.FC<Props> = ({ title, content, date, textLimit, id }) => {
    const { user } = useContext(UserContext);
    const { deleteLocalNote } = useContext(NotesContext);
    const [expanded, setExpanded] = useToggle();
    const navigate = useNavigate();

    const expand = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setExpanded();
    };

    return (
        <div onClick={() => navigate("/")} role="button" tabIndex={0} className={`${CardStyles.card} ${expanded ? CardStyles.active : ""}`}>
            <div className={CardStyles.heading}>
                <h3>{title || "Untitled"}</h3>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className={`${CardStyles.options} ${expanded ? CardStyles.active : ""}`}
                    role="button"
                    onClick={expand}
                />
                <ContextMenu
                    classRef={CardStyles.context_menu}
                    isVisible={expanded}
                    outsideClick={() => setTimeout(() => setExpanded(false), 150)}
                    options={
                        user.loggedIn
                            ? [
                                  { label: "Pin", onClick: () => {} },
                                  { label: "Copy", onClick: () => {} },
                                  { label: "Archive", onClick: () => {} },
                                  { label: "Delete", onClick: () => {} },
                              ]
                            : [
                                  { label: "Copy", onClick: () => {} },
                                  { label: "Delete", onClick: () => deleteLocalNote(id) },
                              ]
                    }
                />
            </div>
            <p>{content && truncate(content, textLimit || 400)}</p>

            <span className={CardStyles.date}>
                {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
        </div>
    );
};
export default Card;
