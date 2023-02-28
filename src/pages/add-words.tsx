import Head from "next/head";

type AddWordsPageProps = {
  children?: React.ReactNode;
};

const AddWordsPage: React.FC<AddWordsPageProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Add Words</title>
      </Head>
      <div>test</div>
    </>
  );
};

export default AddWordsPage;
