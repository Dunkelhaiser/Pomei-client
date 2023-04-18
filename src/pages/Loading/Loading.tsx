import Loader from "../../components/Loader/Loader";
import LoadingStyles from "./Loading.module.scss";

const Loading = () => {
    return (
        <section className={LoadingStyles.loading}>
            <Loader />
        </section>
    );
};
export default Loading;
