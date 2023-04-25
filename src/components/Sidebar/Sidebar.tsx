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
import { useContext } from "react";
import SidebarStyles from "./Sidebar.module.scss";
import Logo from "../../images/Logo.svg";
import { UserContext } from "../../context/UserContext";

const Sidebar: React.FC = () => {
    const { user } = useContext(UserContext);

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
                        <NavLink
                            to="/folders"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faFolder} /> Folders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/archive"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faBoxArchive} /> Archive
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bin"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faTrash} /> Bin
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <ul className={SidebarStyles.navigation}>
                <li>
                    <NavLink
                        to="/settings"
                        className={user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled}
                    >
                        <FontAwesomeIcon icon={faGear} /> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sign_in" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                        <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" /> Sign In
                    </NavLink>
                </li>
            </ul>
            <nav className={SidebarStyles.phone_nav}>
                <ul className={SidebarStyles.navigation}>
                    <li>
                        <NavLink to="/" end className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faHome} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faNoteSticky} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/folders"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faFolder} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/archive"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faBoxArchive} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bin"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faTrash} aria-label="Sign In" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? SidebarStyles.active : ""}` : SidebarStyles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faGear} aria-label="Sign In" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign_in" className={(navData) => (navData.isActive ? SidebarStyles.active : "")}>
                            <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
export default Sidebar;
