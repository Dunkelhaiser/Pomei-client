/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister } from "react-hook-form";
import TextareaStyles from "./Textarea.module.scss";

interface Props {
    name: string;
    placeholder?: string;
    rows?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
}

const Textarea: React.FC<Props> = ({ placeholder, rows = 5, register, name }) => {
    return <textarea rows={rows} placeholder={placeholder} {...register(name)} className={TextareaStyles.textarea} />;
};
export default Textarea;
