import { signInAuth } from "@/store/slices/authSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();

  const handleSignInAuth = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(signInAuth(email, password));
  };

  return (
    <form onSubmit={handleSignInAuth}>
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
