import Head from "next/head";

type SubscribePageProps = {
  children?: React.ReactNode;
};

const SubscribePage: React.FC<SubscribePageProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Subscribe</title>
      </Head>
      <div>subscribe</div>
    </>
  );
};

export default SubscribePage;
