import { useState } from "react";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/services/firebase/firebaseService";

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        // Handle successful login
        const user = userCredential.user;
        console.log("User logged in:", user.email);
      })
      .catch((error) => {
        // Handle errors
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};
