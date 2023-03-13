import { AddWordForm } from "@/components/Forms/AddWordForm";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddWordsPage: React.FC = () => {
  const currentUser = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [router, currentUser]);

  return currentUser ? (
    <>
      <Head>
        <title>Add Words</title>
      </Head>
      <AddWordForm />
    </>
  ) : null;
};

export default AddWordsPage;
