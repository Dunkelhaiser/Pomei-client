import LayoutStyles from "./Layout.module.scss";

interface Props {
    title?: string;
    className?: string;
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, className, children }) => {
    return (
        <>
            {title && <h1 className={LayoutStyles.title}>{title}</h1>}
            <section className={`${LayoutStyles.layout} ${className}`}>{children}</section>
        </>
    );
};
export default Layout;
