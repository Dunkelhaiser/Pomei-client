import LayoutStyles from "./Layout.module.scss";

interface Props {
    title?: string;
    controls?: JSX.Element;
    type?: "grid" | "masonry" | "centered" | "default";
    className?: string;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, controls, type, className, children }) => {
    return (
        <>
            {(title || controls) && (
                <div className={LayoutStyles.header}>
                    {title && <h1 className={LayoutStyles.title}>{title}</h1>}
                    {controls && controls}
                </div>
            )}
            <section className={`${className} ${type ? LayoutStyles[type] : null}`}>{children}</section>
        </>
    );
};
export default Layout;
