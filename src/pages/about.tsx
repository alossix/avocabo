import { useFirestoreDocData } from "reactfire";
import { getFirestore, doc, collection } from "firebase/firestore";

const firestoreInstance = getFirestore();

function AboutPage() {
  const burritoRef = doc(
    collection(firestoreInstance, "tryreactfire"),
    "burrito"
  );
  const { data: burritoData } = useFirestoreDocData(burritoRef);

  const yummy = burritoData?.yummy;

  return (
    <div>
      <h1>About Page</h1>
      {yummy && <p>This burrito is yummy!</p>}
      {!yummy && <p>This burrito is not yummy :(</p>}
    </div>
  );
}

export default AboutPage;
