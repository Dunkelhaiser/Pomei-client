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
import { Link, NavLink } from "react-router-dom";
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
                    <li>
                        <NavLink to="/" end className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faHome} /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faNoteSticky} /> Notes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/folders" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faFolder} /> Folders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/archive" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faBoxArchive} /> Archive
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bin" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faTrash} /> Bin
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <ul className={SidebarStyles.navigation}>
                <li>
                    <NavLink to="/settings" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                        <FontAwesomeIcon icon={faGear} /> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sign_in" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                        <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" /> Sign In
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};
export default Sidebar;
