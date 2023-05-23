import Styles from "./Text.module.scss";

interface Props {
    text: string;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const Text: React.FC<Props> = ({ text, type = "p" }) => {
    const Tag = type;

    const className = () => {
        switch (type) {
            case "h1":
                return "";
            case "h2":
                return "";
            case "h3":
                return "";
            case "h4":
                return "";
            case "h5":
                return "";
            case "h6":
                return "";
            case "p":
                return Styles.paragraph;
            case "span":
                return Styles.paragraph;
            default:
                return Styles.paragraph;
        }
    };

    return <Tag className={className()}>{text}</Tag>;
};
export default Text;
