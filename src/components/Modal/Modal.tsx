import { AnimatePresence } from "framer-motion";
import Overlay from "../Overlay/Overlay";
import Styles from "./Modal.module.scss";

interface Props {
    show: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children, modalRef, show }) => {
    return (
        <AnimatePresence>
            {show && (
                <Overlay>
                    <div className={Styles.modal_window} ref={modalRef}>
                        {children}
                    </div>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default Modal;
