/* eslint-disable react/jsx-props-no-spreading */
import { FieldError, UseFormRegister } from "react-hook-form";
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
        <div className={InputStyles.wrapper}>
            <input
                style={{ fontSize: `${fontSize}rem`, fontWeight }}
                type={type}
                value={value}
                placeholder={placeholder}
                {...(isRegistered ? register(name) : null)}
                className={`${InputStyles.input} ${InputStyles[styleType]} ${errors ? InputStyles.error : ""}`}
            />
            {errors && <span className={InputStyles.error}>{errors.message}</span>}
        </div>
    );
};

export default Input;
