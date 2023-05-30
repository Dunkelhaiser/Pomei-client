/* eslint-disable react/jsx-props-no-spreading */
import { FieldError, UseFormRegister } from "react-hook-form";
import Styles from "./Input.module.scss";

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
    errors?: FieldError | undefined;
}

const Input: React.FC<Props> = ({
    name,
    type = "text",
    placeholder,
    value,
    fontSize,
    fontWeight,
    styleType = "normal",
    register,
    errors,
}) => {
    const isRegistered = register !== undefined && name !== undefined;

    return (
        <div className={Styles.wrapper}>
            <input
                style={{ fontSize: `${fontSize}rem`, fontWeight }}
                type={type}
                value={value}
                placeholder={placeholder}
                {...(isRegistered ? register(name) : null)}
                className={`${Styles.input} ${Styles[styleType]} ${errors ? Styles.error : ""}`}
            />
            {errors && <span className={Styles.error}>{errors.message}</span>}
        </div>
    );
};

export default Input;
