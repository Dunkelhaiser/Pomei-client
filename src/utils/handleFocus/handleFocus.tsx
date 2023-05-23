export const handleFocus = <T extends HTMLElement | SVGElement>(e: React.KeyboardEvent<T>, onClick?: () => void) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick();
    }
};
