import Card from "../../components/Card/Card";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import HomeStyles from "./Home.module.scss";

const Home = () => {
    return (
        <Layout title="Home">
            <h2 className={HomeStyles.sub_title}>Latest Notes</h2>
            <section className={HomeStyles.layout}>
                <Card title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" textLimit={100} />
                <Card
                    title="Quotes"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit necessitatibus veniam vero, voluptatem sint eum
                recusandae eligendi minima quia earum porro eos doloribus minus ipsam, iste voluptas accusantium laudantium similique. "
                    textLimit={100}
                />
                <Card
                    title="AHAHAHA"
                    content="ihjfahfksahfoiaslkhfskahihjfahfksahfoiaslkhfskahfasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.fasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.s. "
                    textLimit={100}
                />
                <Card title="Ideas" content="WHERE ARE MY IDEAS" textLimit={100} />
                <Card title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" textLimit={100} />
                <Card title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" textLimit={100} />
            </section>
            <h2 className={HomeStyles.sub_title}>Latest Folders</h2>
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
