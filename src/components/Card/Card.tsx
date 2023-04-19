import { Link } from "react-router-dom";
import { truncate } from "../../utils/truncate";
import CardStyles from "./Card.module.scss";

interface Props {
    title: string;
    content: string;
    textLimit?: number;
}

const Card: React.FC<Props> = ({ title, content, textLimit }) => {
    return (
        <Link to="/" className={CardStyles.card}>
            <h3>{title}</h3>
            <p>{truncate(content, textLimit || 400)}</p>
        </Link>
    );
};
export default Card;
