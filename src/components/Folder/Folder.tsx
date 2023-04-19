import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FolderStyles from "./Folder.module.scss";

interface Props {
    title: string;
    color?: string;
}

const Folder: React.FC<Props> = ({ title, color }) => {
    return (
        <Link to="/" className={FolderStyles.folder}>
            <FontAwesomeIcon icon={faFolder} color={color || "hsl(208deg 25% 45%)"} />
            <h3>{title}</h3>
        </Link>
    );
};
export default Folder;
