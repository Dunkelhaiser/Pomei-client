import ButtonStyles from "./Button.module.scss";

interface Props {
    label: string;
    color?: "primary" | "danger" | "neutral";
    icon?: JSX.Element;
    fontSize?: number;
    type?: "normal" | "outline" | "text";
    onClick: () => void;
}

const Button: React.FC<Props> = ({ label, color = "primary", fontSize = 1.2, type = "normal", icon, onClick }) => {
    return (
        <button
            className={`${ButtonStyles.button} ${ButtonStyles[color]} ${ButtonStyles[type]}`}
            onClick={onClick}
            style={{ fontSize: `${fontSize}rem` }}
        >
            {icon} {label}
        </button>
    );
};
export default Button;
