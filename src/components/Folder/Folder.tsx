import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import FolderStyles from "./Folder.module.scss";

interface Props {
    title: string;
    color?: string;
}

const Folder: React.FC<Props> = ({ title, color }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/")} role="button" tabIndex={0} className={FolderStyles.folder}>
            <FontAwesomeIcon icon={faFolder} color={color || "hsl(208deg 25% 45%)"} />
            <h3>{title}</h3>
        </div>
    );
};
export default Folder;
