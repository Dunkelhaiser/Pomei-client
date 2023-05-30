import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import FloatingIcon from "../../components/FloatingIcon/FloatingIcon";

const Folders = () => {
    return (
        <>
            <FloatingIcon icon={faPlus} />
            <Layout title="Folders" type="grid">
                <Folder title="My Folder" />
                <Folder title="Homework" color="purple" />
                <Folder title="Secret" color="green" />
                <Folder title="Copy" />
                <Folder title="Copy" color="grey" />
                <Folder title="Copy" color="teal" />
                <Folder title="Copy" />
            </Layout>
        </>
    );
};
export default Folders;
