import LoaderStyles from "./Loader.module.scss";

const Loader: React.FC = () => {
    return (
        <div className={LoaderStyles.loader}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

export default Loader;
