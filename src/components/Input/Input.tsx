/* eslint-disable react/jsx-props-no-spreading */
import { UseFormRegister } from "react-hook-form";
import InputStyles from "./Input.module.scss";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    fontSize?: number;
    fontWeight?: number;
    styleType?: "normal" | "line" | "text";
    type?: "text" | "email" | "password" | "color" | "date" | "file" | "number" | "radio" | "range" | "tel";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
}

const Input: React.FC<Props> = ({ name, type = "text", placeholder, value, fontSize, fontWeight, styleType = "normal", register }) => {
    return register !== undefined && name !== undefined ? (
        <input
            style={{ fontSize: `${fontSize}rem`, fontWeight }}
            type={type}
            value={value}
            placeholder={placeholder}
            {...register(name)}
            className={`${InputStyles.input} ${InputStyles[styleType]}`}
        />
    ) : (
        <input
            type={type}
            style={{ fontSize: `${fontSize}rem`, fontWeight }}
            value={value}
            placeholder={placeholder}
            className={`${InputStyles.input} ${InputStyles[styleType]}`}
        />
    );
};
export default Input;
