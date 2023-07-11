import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import Styles from "./Confirmation.module.scss";

interface Props {
    show: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    close: () => void;
    message: string;
    onConfirm: () => void;
    option: string;
    color?: "primary" | "danger" | "neutral";
    disabled?: boolean;
}

const Confirmation: React.FC<Props> = ({ show, modalRef, close, message, onConfirm, option, color = "primary", disabled }) => {
    return (
        <Modal show={show} modalRef={modalRef}>
            <Text text={message} type="h3" />
            <div className={Styles.buttons}>
                <Button label="Cancel" onClick={close} fontSize={1} />
                <Button
                    label={option}
                    onClick={() => {
                        onConfirm();
                        close();
                    }}
                    color={color}
                    fontSize={1}
                    disabled={disabled}
                />
            </div>
        </Modal>
    );
};
export default Confirmation;
