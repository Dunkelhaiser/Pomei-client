import { BaseSyntheticEvent } from "react";
import Text from "../Text/Text";
import Styles from "./Form.module.scss";

interface Props {
    children: React.ReactNode;
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

interface InputSectionProps {
    children: React.ReactNode;
}

export const InputSection: React.FC<InputSectionProps> = ({ children }) => {
    return <div className={Styles.input_section}>{children}</div>;
};

const Form: React.FC<Props> = ({ children, title, onSubmit }) => {
    return (
        <form className={Styles.form} onSubmit={onSubmit}>
            <Text text={title} type="h1" />
            {children}
        </form>
    );
};
export default Form;
