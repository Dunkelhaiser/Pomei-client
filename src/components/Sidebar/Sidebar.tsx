import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    // faBorderAll,
    // faList,
    faRightToBracket,
    // faRightFromBracket,
    faGear,
    // faArrowRotateRight,
    faHome,
    faNoteSticky,
    faFolder,
    faBoxArchive,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SidebarStyles from "./Sidebar.module.scss";
import Logo from "../../images/Logo.svg";

const Sidebar: React.FC = () => {
    return (
        <aside className={SidebarStyles.sidebar}>
            <Link to="/" className={SidebarStyles.logo}>
                <img src={Logo} alt="Logo" />
            </Link>
            <nav>
                <ul className={SidebarStyles.navigation}>
                    <li className={SidebarStyles.active}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faNoteSticky} /> Notes
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faFolder} /> Folders
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBoxArchive} /> Archive
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTrash} /> Bin
                    </li>
                </ul>
            </nav>
            <ul className={SidebarStyles.navigation}>
                <li>
                    <FontAwesomeIcon icon={faGear} /> Settings
                </li>
                <li>
                    <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" /> Sign In
                </li>
            </ul>
        </aside>
    );
};
export default Sidebar;
