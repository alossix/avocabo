import { Button } from "@/components/Button";
import { signInAuth } from "@/store/slices/authSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signIn();
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    signIn();
  };

  const signIn = () => {
    try {
      dispatch(signInAuth(email, password));
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{`${t("common:email")}: `}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>{`${t("common:password")}: `}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        ariaLabel={t("common:sign_in")}
        onClick={handleButtonClick}
        title={t("common:sign_in")}
        type="button"
      >
        {t("common:sign_in")}
      </Button>
    </form>
  );
};
