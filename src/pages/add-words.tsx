import { AddWordForm } from "@/components/Forms/AddWordForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Head from "next/head";

const AddWordsPage: React.FC = () => {
  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : (
    <>
      <Head>
        <title>Add Words</title>
      </Head>
      <AddWordForm />
    </>
  );
};

export default AddWordsPage;
