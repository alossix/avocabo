import { TextInput } from "@/components/UI/TextInput";
import { Toast } from "@/components/UI/Toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createUserAuth,
  selectError,
  setAppError,
} from "@/store/slices/authSlice";
import { theme } from "@/styles/theme";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../UI/Button";
import { LanguageSelector } from "../LanguageSelector";

type SignUpFormData = {
  confirmPassword: string;
  displayName: string;
  email: string;
  password: string;
};

export const SignUpForm: React.FC = () => {
  const { lang, t } = useTranslation("common");
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const [learningLanguage, setLearningLanguage] = useState<LearningLanguages>(
    lang as LearningLanguages
  );
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const appErrorMessage = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const getErrorMessage = (errorType: string) => {
    const errorMessages: { [key: string]: string } = {
      displayNameRequired: t("common:display_name_required"),
      emailRequired: t("common:email_required"),
      invalidEmail: t("common:invalid_email"),
      passwordRequired: t("common:password_required"),
      passwordMinLength: t("common:password_min_length"),
      confirmPasswordRequired: t("common:confirm_password_required"),
      passwordMismatch: t("common:password_must_match"),
    };

    return errorMessages[errorType] || "";
  };

  const displayErrorMessage = (errorType: string) => {
    dispatch(setAppError(getErrorMessage(errorType)));
    setShowErrorMessage(true);

    setTimeout(() => {
      dispatch(setAppError(""));
      setShowErrorMessage(false);
    }, 10000);
  };

  const handleSignupSubmit = async (data: SignUpFormData) => {
    const { displayName, email, password, confirmPassword } = data;

    if (!displayName) {
      displayErrorMessage("displayNameRequired");
      return;
    }

    if (!email || !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
      displayErrorMessage(!email ? "emailRequired" : "invalidEmail");
      return;
    }

    if (!password || password.length < 6) {
      displayErrorMessage(!password ? "passwordRequired" : "passwordMinLength");
      return;
    }

    if (!confirmPassword || confirmPassword !== password) {
      displayErrorMessage(
        !confirmPassword ? "confirmPasswordRequired" : "passwordMismatch"
      );
      return;
    }

    dispatch(
      createUserAuth({
        displayName,
        email,
        interfaceLanguage: lang as InterfaceLanguages,
        learningLanguage,
        password,
      })
    );
  };

  const onSubmit = handleSubmit(handleSignupSubmit);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    dispatch(setAppError(""));
    setShowErrorMessage(false);
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    if (appErrorMessage) {
      setShowErrorMessage(true);

      setTimeout(() => {
        dispatch(setAppError(""));
        setShowErrorMessage(false);
      }, 10000);
    }
  }, [appErrorMessage]);

  return (
    <StyledForm
      autoComplete="off"
      name="create_user_form"
      onKeyDown={handleKeyDown}
      onSubmit={onSubmit}
    >
      <InputContainer>
        <TextInput
          id="displayName"
          labelText={t("common:profile_name")}
          register={register("displayName")}
          type="string"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="email"
          labelText={t("common:email")}
          register={register("email")}
          type="email"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="password"
          labelText={t("common:password")}
          register={register("password")}
          type="password"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="confirmPassword"
          labelText={t("common:confirm_password")}
          register={register("confirmPassword")}
          type="password"
        />
      </InputContainer>
      <InputContainer
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          color: theme.colors.darkGrey,
        }}
      >
        <label>{t("common:learning_language")}</label>
        <LanguageSelector
          handleSelectLanguage={(event) =>
            setLearningLanguage(event.target.value as LearningLanguages)
          }
          languageSet={"learning"}
          selectedLanguage={learningLanguage}
          showIcon={false}
        />
      </InputContainer>
      <Button
        ariaLabel={t("common:sign_up")}
        title={t("common:sign_up")}
        type="submit"
      >
        {t("common:sign_up")}
      </Button>
      {showErrorMessage && (
        <Toast
          duration={10000}
          onClose={() => setShowErrorMessage(false)}
          toastType="error"
          toastText={appErrorMessage}
        />
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: "50%",
  },
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
