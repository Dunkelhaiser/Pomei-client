import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { handleFocus } from "../../utils/handleFocus/handleFocus";
import Input from "../Input/Input";
import Styles from "./PasswordField.module.scss";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    fontSize?: number;
    fontWeight?: number;
    styleType?: "normal" | "line" | "text";
    type?: "text" | "email" | "password" | "color" | "date" | "file" | "number" | "radio" | "range" | "tel";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    errors?: FieldError | string | undefined | null;
}

const PasswordField: React.FC<Props> = ({ name, placeholder, value, fontSize, fontWeight, styleType = "normal", register, errors }) => {
    const [showPsd, setShowPsd] = useState(false);
    const togglePsw = () => {
        setShowPsd(!showPsd);
    };

    const eyeIcon = (
        <FontAwesomeIcon
            icon={showPsd ? faEye : faEyeSlash}
            className={Styles.eye}
            onClick={togglePsw}
            tabIndex={0}
            onKeyDown={(e) => handleFocus(e, togglePsw)}
        />
    );
    return (
        <div className={Styles.wrapper}>
            <Input
                type={showPsd ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                fontSize={fontSize}
                fontWeight={fontWeight}
                styleType={styleType}
                register={register}
                errors={errors}
            />
            {eyeIcon}
        </div>
    );
};
export default PasswordField;
