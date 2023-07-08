import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import OverlayStyles from "./Overlay.module.scss";

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    duration?: number;
}

const Overlay: React.FC<Props> = ({ children, onClick, duration = 0.1 }) => {
    return ReactDOM.createPortal(
        <motion.div
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
            }}
            className={OverlayStyles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
        >
            {children}
        </motion.div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.querySelector("#overlays")!
    );
};

export default Overlay;
