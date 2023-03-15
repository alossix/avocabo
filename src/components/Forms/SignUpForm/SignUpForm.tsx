import { createUserAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import useTranslation from "next-translate/useTranslation";
import { FormEvent, useState } from "react";
import { Button } from "../../Button";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import { LanguageSelector } from "@/components/LanguageSelector";

export const SignUpForm: React.FC = () => {
  const { t, lang } = useTranslation("common");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setError] = useState("");

  const dispatch = useAppDispatch();

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidPassword = validatePassword();
    if (!isValidPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      dispatch(
        createUserAuth({
          displayName,
          email,
          interfaceLanguage: lang as InterfaceLanguages,
          learningLanguage: lang as LearningLanguages,
          password,
        })
      );
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSignupSubmit} name="create_user_form">
      <div>
        <label>{`${t("common:profile_name")}: `}</label>
        <input
          type="string"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>{`${t("common:email")}: `}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label>{`${t("common:learning_language")}`}</label>
        <LanguageSelector />
      </div>
      <div>
        <label>{`${t("common:password")}: `}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>{`${t("common:confirm_password")}: `}</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <Button
        ariaLabel={t("common:sign_up")}
        onClick={(e: FormEvent<HTMLFormElement>) => handleSignupSubmit(e)}
        title={t("common:sign_up")}
        type="submit"
      >
        {t("common:sign_up")}
      </Button>
    </form>
  );
};
