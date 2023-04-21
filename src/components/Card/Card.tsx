import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { truncate } from "../../utils/truncate";
import CardStyles from "./Card.module.scss";

interface Props {
    title: string;
    content: string;
    date: string;
    textLimit?: number;
}

const Card: React.FC<Props> = ({ title, content, date, textLimit }) => {
    return (
        <Link to="/" className={CardStyles.card}>
            <div className={CardStyles.heading}>
                <h3>{title}</h3>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
            <p>{truncate(content, textLimit || 400)}</p>

            <span className={CardStyles.date}>{date}</span>
        </Link>
    );
};
export default Card;
