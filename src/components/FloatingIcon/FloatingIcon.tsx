import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleFocus } from "../../utils/handleFocus/handleFocus";
import Styles from "./FloatingIcon.module.scss";

interface Props {
    icon: IconDefinition;
    onClick?: () => void;
}

const FloatingIcon: React.FC<Props> = ({ icon, onClick }) => {
    return (
        <FontAwesomeIcon
            icon={icon}
            onClick={onClick}
            onKeyDown={(e) => handleFocus(e, onClick)}
            className={Styles.icon}
            focusable
            tabIndex={0}
            role="button"
        />
    );
};
export default FloatingIcon;
