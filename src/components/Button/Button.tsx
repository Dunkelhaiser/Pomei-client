import Styles from "./Button.module.scss";

interface Props {
    label: string;
    color?: "primary" | "danger" | "neutral";
    icon?: JSX.Element;
    fontSize?: number;
    type?: "button" | "submit" | "reset";
    styleType?: "normal" | "outline" | "text";
    onClick?: () => void;
}

const Button: React.FC<Props> = ({ label, color = "primary", fontSize = 1.2, type = "button", styleType = "normal", icon, onClick }) => {
    return (
        <button
            type={type}
            className={`${Styles.button} ${Styles[color]} ${Styles[styleType]}`}
            onClick={onClick}
            style={{ fontSize: `${fontSize}rem` }}
        >
            {icon} {label}
        </button>
    );
};
export default Button;
