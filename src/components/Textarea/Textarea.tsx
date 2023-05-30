/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister } from "react-hook-form";
import TextareaStyles from "./Textarea.module.scss";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    rows?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
}

const Textarea: React.FC<Props> = ({ placeholder, value, rows = 5, register, name }) => {
    const isRegistered = register !== undefined && name !== undefined;
    return (
        <textarea
            rows={rows}
            value={value}
            placeholder={placeholder}
            {...(isRegistered ? register(name) : null)}
            className={TextareaStyles.textarea}
        />
    );
};
export default Textarea;
