import { AddWordForm } from "@/components/AddWordForm/AddWordForm";
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
      <AddWordForm />
    </>
  );
};

export default AddWordsPage;
