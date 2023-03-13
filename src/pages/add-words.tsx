import { AddWordForm } from "@/components/Forms/AddWordForm";
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
