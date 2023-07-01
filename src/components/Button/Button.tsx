import Styles from "./Button.module.scss";

interface Props {
    label: string;
    color?: "primary" | "danger" | "neutral";
    icon?: JSX.Element;
    fontSize?: number;
    type?: "button" | "submit" | "reset";
    styleType?: "normal" | "outline" | "text";
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
    label,
    color = "primary",
    fontSize = 1.2,
    type = "button",
    styleType = "normal",
    icon,
    onClick,
    disabled,
}) => {
    return (
        <button
            type={type}
            className={`${Styles.button} ${Styles[color]} ${Styles[styleType]} ${disabled ? Styles.disabled : ""}`}
            onClick={onClick}
            style={{ fontSize: `${fontSize}rem` }}
            disabled={disabled}
        >
            {icon} {label}
        </button>
    );
};
export default Button;
