import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";

type FirebaseProvidersProps = {
  children?: React.ReactNode;
};

export const FirebaseProviders: React.FC<FirebaseProvidersProps> = ({
  children,
}) => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
    </AuthProvider>
  );
};
