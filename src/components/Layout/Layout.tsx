import LayoutStyles from "./Layout.module.scss";

interface Props {
    title?: string;
    type?: "grid" | "masonry";
    className?: string;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, type, className, children }) => {
    return (
        <>
            {title && <h1 className={LayoutStyles.title}>{title}</h1>}
            <section
                className={`${LayoutStyles.layout} ${className} ${
                    type === "grid" ? LayoutStyles.grid : type === "masonry" ? LayoutStyles.masonry : ""
                }`}
            >
                {children}
            </section>
        </>
    );
};
export default Layout;
