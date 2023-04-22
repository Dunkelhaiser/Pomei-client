import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import ContextMenuStyles from "./ContextMenu.module.scss";

interface Props {
    classRef: string;
    options: { label: string; onClick: () => void }[];
    outsideClick?: () => void;
}

const ContextMenu: React.FC<Props> = ({ classRef, options, outsideClick }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const handleClick = (e: React.MouseEvent<HTMLSpanElement>, callback: () => void) => {
        e.stopPropagation();
        callback();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && outsideClick) {
                outsideClick();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className={`${ContextMenuStyles.context_menu} ${classRef}`}>
            <ul>
                {options?.map((option) => (
                    <li key={uuid()}>
                        <span onClick={(e) => handleClick(e, option.onClick)} tabIndex={0} role="button">
                            {option.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ContextMenu;
