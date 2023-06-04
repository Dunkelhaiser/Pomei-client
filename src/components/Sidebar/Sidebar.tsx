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
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Styles from "./Sidebar.module.scss";
import Logo from "../../images/Logo.svg";
import { UserContext } from "../../context/UserContext";
import Overlay from "../Overlay/Overlay";
import useToggle from "../../hooks/useToggle/useToggle";
import Hamburger from "../Hamburger/Hamburger";
import Button from "../Button/Button";

interface MenuItem {
    to: string;
    icon: IconDefinition;
    label: string;
    disabled?: boolean;
}

interface MenuProps {
    close?: () => void;
}

const Menu: React.FC<MenuProps> = ({ close }) => {
    const { isAuthorized, signOut, user } = useContext(UserContext);

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
            disabled: !isAuthorized,
        },
        {
            to: "/archive",
            icon: faBoxArchive,
            label: "Archive",
            disabled: !isAuthorized,
        },
        {
            to: "/bin",
            icon: faTrash,
            label: "Bin",
            disabled: !isAuthorized,
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
                                onClick={close}
                                to={item.to}
                                className={!item.disabled ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                            >
                                <FontAwesomeIcon icon={item.icon} /> {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <ul className={Styles.navigation}>
                <li>
                    <NavLink
                        onClick={close}
                        to="/settings"
                        className={isAuthorized ? (navData) => `${navData.isActive ? Styles.active : ""}` : Styles.disabled}
                    >
                        <FontAwesomeIcon icon={faGear} /> Settings
                    </NavLink>
                </li>
                <li>
                    {isAuthorized ? (
                        <>
                            <NavLink to="account" onClick={close} className={(navData) => (navData.isActive ? Styles.active : "")}>
                                {user?.username}
                            </NavLink>
                            <Button label="Sign Out" onClick={signOut} />
                        </>
                    ) : (
                        <NavLink to="/sign_in" onClick={close} className={(navData) => (navData.isActive ? Styles.active : "")}>
                            <FontAwesomeIcon icon={faRightToBracket} aria-label="Sign In" /> Sign In
                        </NavLink>
                    )}
                </li>
            </ul>
        </aside>
    );
};

const Sidebar: React.FC = () => {
    const [opened, setOpened] = useToggle(false);
    const isPhone = useMediaQuery({ query: "(max-width: 600px)" });

    return isPhone ? (
        <>
            <Hamburger onClick={() => setOpened()} expanded={opened} className={Styles.hamburger} />
            <AnimatePresence>
                {opened ? (
                    <Overlay onClick={() => setOpened(false)}>
                        <motion.div
                            className={Styles.container}
                            initial={{ transform: "translateX(-100%)" }}
                            animate={{ transform: "translateX(0)" }}
                            exit={{ transform: "translateX(-100%)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Menu close={() => setOpened(false)} />
                        </motion.div>
                    </Overlay>
                ) : null}
            </AnimatePresence>
        </>
    ) : (
        <Menu />
    );
};
export default Sidebar;
