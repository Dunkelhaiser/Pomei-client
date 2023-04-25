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
    return register !== undefined && name !== undefined ? (
        <textarea rows={rows} value={value} placeholder={placeholder} {...register(name)} className={TextareaStyles.textarea} />
    ) : (
        <textarea rows={rows} value={value} placeholder={placeholder} className={TextareaStyles.textarea} />
    );
};
export default Textarea;
