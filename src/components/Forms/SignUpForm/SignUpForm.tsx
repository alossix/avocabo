import { handleAppError } from "@/lib/handleAppError";
import { useAppDispatch } from "@/store/hooks";
import { createUserAuth, setAppError } from "@/store/slices/authSlice";
import { theme } from "@/styles/theme";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../UI/Button";
import { LanguageSelector } from "../LanguageSelector";
import { TextInput } from "@/components/UI/TextInput";

type SignUpFormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm: React.FC = () => {
  const { t, lang } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const [error, setError] = useState("");
  const [learningLanguage, setLearningLanguage] = useState<LearningLanguages>(
    lang as LearningLanguages
  );
  const dispatch = useAppDispatch();

  const handleSignupSubmit = async (data: SignUpFormData) => {
    const { displayName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError(t("common:password_must_match"));
      return;
    }

    try {
      dispatch(
        createUserAuth({
          displayName,
          email,
          interfaceLanguage: lang as InterfaceLanguages,
          learningLanguage,
          password,
        })
      );
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(handleSignupSubmit)}
      name="create_user_form"
      autoComplete="off"
    >
      <InputContainer>
        <TextInput
          id="displayName"
          labelText={t("common:profile_name")}
          register={register("displayName", { required: true })}
          type="string"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="email"
          labelText={t("common:email")}
          register={register("email", {
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          })}
          type="email"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="password"
          labelText={t("common:password")}
          register={register("password", {
            required: true,
            minLength: 6,
          })}
          type="password"
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="confirmPassword"
          labelText={t("common:confirm_password")}
          register={register("confirmPassword", {
            required: true,
          })}
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
      {/* Display Name Error */}
      {errors.displayName && errors.displayName.type === "required" && (
        <p>{t("common:display_name_required")}</p>
      )}

      {/* Email Error */}
      {errors.email && errors.email.type === "required" && (
        <p>{t("common:email_required")}</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>{t("common:invalid_email")}</p>
      )}

      {/* Password Error */}
      {errors.password && errors.password.type === "required" && (
        <p>{t("common:password_required")}</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p>{t("common:password_min_length")}</p>
      )}

      {/* Confirm Password Error */}
      {errors.confirmPassword && errors.confirmPassword.type === "required" && (
        <p>{t("common:confirm_password_required")}</p>
      )}
      {error && <p>{error}</p>}
    </StyledForm>
  );
};

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 16,

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: "50%",
  },
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
