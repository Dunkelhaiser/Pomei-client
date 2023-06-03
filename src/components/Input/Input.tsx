/* eslint-disable react/jsx-props-no-spreading */
import { debounce } from "debounce";
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
    errors?: FieldError | string | undefined | null;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    delay?: number;
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
    onKeyUp,
    delay = 500,
}) => {
    const isRegistered = register !== undefined && name !== undefined;

    const errorMessage =
        errors && typeof errors === "object" && "message" in errors ? errors.message : typeof errors === "string" ? errors : undefined;

    return (
        <div className={Styles.wrapper}>
            <input
                style={{ fontSize: `${fontSize}rem`, fontWeight }}
                type={type}
                value={value}
                placeholder={placeholder}
                {...(isRegistered ? register(name) : null)}
                className={`${Styles.input} ${Styles[styleType]} ${errors ? Styles.error : ""}`}
                onKeyUp={onKeyUp ? debounce(onKeyUp, delay) : undefined}
                aria-invalid={errors ? "true" : "false"}
            />
            {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
        </div>
    );
};

export default Input;
