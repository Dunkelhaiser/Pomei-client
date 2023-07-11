import Masonry from "react-masonry-css";
import Styles from "./Layout.module.scss";

interface Props {
    title?: string;
    controls?: JSX.Element;
    type?: "grid" | "masonry" | "centered" | "default" | null;
    className?: string;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, controls, type, className, children }) => {
    const breakpoints = {
        default: 4,
        1200: 3,
        900: 2,
        600: 1,
    };

    return (
        <>
            {(title || controls) && (
                <div className={Styles.header}>
                    {title && <h1 className={Styles.title}>{title}</h1>}
                    {controls && controls}
                </div>
            )}
            {type !== "masonry" ? (
                <section className={`${className} ${type ? Styles[type] : null}`}>{children}</section>
            ) : (
                <Masonry breakpointCols={breakpoints} className={Styles.masonry} columnClassName={Styles.column}>
                    {children}
                </Masonry>
            )}
        </>
    );
};
export default Layout;
