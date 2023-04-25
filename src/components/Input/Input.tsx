/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister } from "react-hook-form";
import InputStyles from "./Input.module.scss";

interface Props {
    name: string;
    placeholder?: string;
    styleType?: "normal" | "line" | "text";
    type?: "text" | "email" | "password" | "color" | "date" | "file" | "number" | "radio" | "range" | "tel";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
}

const Input: React.FC<Props> = ({ name, type = "text", placeholder, styleType = "normal", register }) => {
    return <input type={type} placeholder={placeholder} {...register(name)} className={`${InputStyles.input} ${InputStyles[styleType]}`} />;
};
export default Input;
