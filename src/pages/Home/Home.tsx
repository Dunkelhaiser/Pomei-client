import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/Card/Card";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import HomeStyles from "./Home.module.scss";

const Home = () => {
    return (
        <Layout title="Home">
            <div className={HomeStyles.heading}>
                <h2>Latest Notes</h2>
                <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} />
            </div>
            <section className={HomeStyles.layout}>
                <Card
                    title="Apps"
                    content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive"
                    date="28th April, 2023"
                    textLimit={100}
                />
                <Card
                    title="Quotes"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit necessitatibus veniam vero, voluptatem sint eum
                recusandae eligendi minima quia earum porro eos doloribus minus ipsam, iste voluptas accusantium laudantium similique."
                    date="28th April, 2023"
                    textLimit={100}
                />
                <Card
                    title="AHAHAHA"
                    content="ihjfahfksahfoiaslkhfskahihjfahfksahfoiaslkhfskahfasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.fasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.s."
                    date="28th April, 2023"
                    textLimit={100}
                />
                <Card title="Ideas" content="WHERE ARE MY IDEAS" date="28th April, 2023" textLimit={100} />
                <Card
                    title="Apps"
                    content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive"
                    date="28th April, 2023"
                    textLimit={100}
                />
                <Card
                    title="Apps"
                    content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive"
                    date="28th April, 2023"
                    textLimit={100}
                />
            </section>
            <div className={HomeStyles.heading}>
                <h2>Latest Folders</h2>
                <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} />
            </div>
            <section className={HomeStyles.layout}>
                <Folder title="My Folder" />
                <Folder title="Homework" color="purple" />
                <Folder title="Secret" color="green" />
                <Folder title="Copy" />
            </section>
        </Layout>
    );
};
export default Home;
