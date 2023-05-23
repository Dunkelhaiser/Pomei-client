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
    return register !== undefined && name !== undefined ? (
        <div className={InputStyles.wrapper}>
            <input
                style={{ fontSize: `${fontSize}rem`, fontWeight }}
                type={type}
                value={value}
                placeholder={placeholder}
                {...register(name)}
                className={`${InputStyles.input} ${InputStyles[styleType]} ${errors ? InputStyles.error : ""}`}
            />
            {errors && <span className={InputStyles.error}>{errors.message}</span>}
        </div>
    ) : (
        <div className={InputStyles.wrapper}>
            <input
                type={type}
                style={{ fontSize: `${fontSize}rem`, fontWeight }}
                value={value}
                placeholder={placeholder}
                className={`${InputStyles.input} ${InputStyles[styleType]} ${errors ? InputStyles.error : ""}`}
            />
            {errors && <span className={InputStyles.error}>{errors.message}</span>}
        </div>
    );
};
export default Input;
