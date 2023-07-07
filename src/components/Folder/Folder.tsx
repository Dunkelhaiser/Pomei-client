import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Folder.module.scss";

interface Props {
    id: string;
    title: string;
    color?: string;
}

const Folder: React.FC<Props> = ({ id, title, color }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/folders/${id}`)} role="button" tabIndex={0} className={Styles.folder}>
            <FontAwesomeIcon icon={faFolder} color={color || "hsl(208deg 25% 45%)"} />
            <h3>{title}</h3>
        </div>
    );
};
export default Folder;
