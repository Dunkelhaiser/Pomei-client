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
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import Styles from "./Sidebar.module.scss";
import Logo from "../../images/Logo.svg";
import { UserContext } from "../../context/UserContext";

interface MenuItem {
    to: string;
    icon: IconDefinition;
    label: string;
    disabled?: boolean;
}

const Sidebar: React.FC = () => {
    const { user } = useContext(UserContext);

    const menuItems: MenuItem[] = [
        {
            to: "/",
            icon: faHome,
            label: "Home",
        },
        {
            to: "/notes",
            icon: faNoteSticky,
            label: "Notes",
        },
        {
            to: "/folders",
            icon: faFolder,
            label: "Folders",
            disabled: !user.loggedIn,
        },
        {
            to: "/archive",
            icon: faBoxArchive,
            label: "Archive",
            disabled: !user.loggedIn,
        },
        {
            to: "/bin",
            icon: faTrash,
            label: "Bin",
            disabled: !user.loggedIn,
        },
    ];

    return (
        <aside className={Styles.sidebar}>
            <Link to="/" className={Styles.logo}>
                <img src={Logo} alt="Logo" />
            </Link>
            <nav>
                <ul className={Styles.navigation}>
                    {menuItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={!item.disabled ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                            >
                                <FontAwesomeIcon icon={item.icon} /> {item.label}
                            </NavLink>
                        </li>
                    ))}
                    {/* <li>
                        <NavLink to="/" end className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faHome} /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faNoteSticky} /> Notes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/folders"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faFolder} /> Folders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/archive"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faBoxArchive} /> Archive
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bin"
                            className={
                                user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled
                            }
                        >
                            <FontAwesomeIcon icon={faTrash} /> Bin
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
            <ul className={Styles.navigation}>
                <li>
                    <NavLink
                        to="/settings"
                        className={user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                    >
                        <FontAwesomeIcon icon={faGear} /> Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sign_in" className={(navData) => (navData.isActive ? Styles.active : "")}>
                        <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" /> Sign In
                    </NavLink>
                </li>
            </ul>
            <nav className={Styles.phone_nav}>
                <ul className={Styles.navigation}>
                    <li>
                        <NavLink to="/" end className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faHome} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faNoteSticky} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/folders"
                            className={user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                        >
                            <FontAwesomeIcon icon={faFolder} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/archive"
                            className={user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                        >
                            <FontAwesomeIcon icon={faBoxArchive} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bin"
                            className={user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                        >
                            <FontAwesomeIcon icon={faTrash} aria-label="Sign In" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={user.loggedIn ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                        >
                            <FontAwesomeIcon icon={faGear} aria-label="Sign In" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign_in" className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
export default Sidebar;
