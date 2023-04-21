import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import NotesStyles from "./Notes.module.scss";

const Notes = () => {
    return (
        <Layout title="Notes" className={NotesStyles.layout}>
            <Card title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" date="28th April, 2023" />
            <Card
                title="Quotes"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit necessitatibus veniam vero, voluptatem sint eum
                recusandae eligendi minima quia earum porro eos doloribus minus ipsam, iste voluptas accusantium laudantium similique."
                date="28th April, 2023"
            />
            <Card
                title="AHAHAHA"
                content="ihjfahfksahfoiaslkhfskahihjfahfksahfoiaslkhfskahfasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.fasokbc asfhasfnjkbas vkcasb cjiaskbv askjmfbv sakjvmb asvkj,vb sakjv,abs vkjm,as baskjvm asklafsnafs ,fsankjf,msafsanfasjkfas fkjasmf askjmf askf,mas fkjas,f askf,mm askf,an fkjas,n fkas,fn a dasnbdjaskb adskb fikj asbfkj afj.s."
                date="28th April, 2023"
            />
            <Card title="Ideas" content="WHERE ARE MY IDEAS" date="28th April, 2023" />
            <Card title="Apps" content="Bitwarden Bitdefender PCloud/IceDrive/Google One/OneDrive" date="28th April, 2023" />
            <Card title="Dream" content="Kono Giorno Giovanna" date="28th April, 2023" />
            <Card title="Task" content="I need to do this shit tomorrow or I will be fired." date="28th April, 2023" />
        </Layout>
    );
};
export default Notes;
