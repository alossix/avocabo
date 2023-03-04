import { AddWordForm } from "@/components/AddWordForm/AddWordForm";
import Head from "next/head";

const AddWordsPage: React.FC = () => {
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
