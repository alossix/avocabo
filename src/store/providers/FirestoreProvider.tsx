import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

type FirestoreProviderProps = {
  children?: React.ReactNode;
};

export const FirestoreProviderWrapper: React.FC<FirestoreProviderProps> = ({
  children,
}) => {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
};
