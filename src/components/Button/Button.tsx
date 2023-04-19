import ButtonStyles from "./Button.module.scss";

interface Props {
    label: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({ label, onClick }) => {
    return (
        <button className={ButtonStyles.button} onClick={onClick}>
            {label}
        </button>
    );
};
export default Button;
