import Styles from "./Form.module.scss";

interface Props {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ children, onSubmit }) => {
    return (
        <form className={Styles.form} onSubmit={onSubmit}>
            {children}
        </form>
    );
};
export default Form;
