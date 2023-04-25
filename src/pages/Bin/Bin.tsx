import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";

const Bin = () => {
    return (
        <Layout
            title="Bin"
            controls={
                <Button
                    label="Delete All"
                    color="danger"
                    fontSize={1}
                    styleType="text"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => console.log("Deleted")}
                />
            }
            type="masonry"
        >
            <Card id="dsadas" title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" date="28th April, 2023" />
        </Layout>
    );
};
export default Bin;
