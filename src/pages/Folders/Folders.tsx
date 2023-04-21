import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";

const Folders = () => {
    return (
        <Layout title="Folders" type="grid">
            <Folder title="My Folder" />
            <Folder title="Homework" color="purple" />
            <Folder title="Secret" color="green" />
            <Folder title="Copy" />
            <Folder title="Copy" color="grey" />
            <Folder title="Copy" color="teal" />
            <Folder title="Copy" />
        </Layout>
    );
};
export default Folders;
