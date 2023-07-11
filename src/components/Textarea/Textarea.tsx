/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import Styles from "./Textarea.module.scss";

interface Props {
    name?: string;
    placeholder?: string;
    value?: string;
    rows?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
}

const Textarea: React.FC<Props> = ({ placeholder, value, rows, register, name }) => {
    const isRegistered = register !== undefined && name !== undefined;

    const resize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget) {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }
    };

    useEffect(() => {
        resize({
            currentTarget: document.querySelector(`.${Styles.textarea}`) as HTMLTextAreaElement,
        } as React.KeyboardEvent<HTMLTextAreaElement>);
    }, [value]);

    return (
        <textarea
            rows={rows}
            value={value}
            onKeyUp={resize}
            placeholder={placeholder}
            {...(isRegistered ? register(name) : null)}
            className={Styles.textarea}
        />
    );
};
export default Textarea;
