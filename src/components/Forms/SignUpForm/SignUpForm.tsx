import { LanguageSelector } from "@/components/LanguageSelector";
import { useAppDispatch } from "@/store/hooks";
import { createUserAuth } from "@/store/slices/authSlice";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../UI/Button";

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
  const [learningLanguage, setLearningLanguage] = useState(
    lang as LearningLanguages
  );
  const dispatch = useAppDispatch();

  const handleSelectLearningLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLearningLanguage(event.target.value as InterfaceLanguages);
  };

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
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(handleSignupSubmit)}
      name="create_user_form"
    >
      <div>
        <label>{`${t("common:profile_name")}: `}</label>
        <input {...register("displayName", { required: true })} type="string" />
      </div>
      <div>
        <label>{`${t("common:email")}: `}</label>
        <input
          {...register("email", {
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          })}
          type="email"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label>{`${t("common:learning_language")}`}</label>
        <LanguageSelector
          showIcon={false}
          handleSelectLanguage={handleSelectLearningLanguage}
          selectedLanguage={learningLanguage}
        />
      </div>
      <div>
        <label>{`${t("common:password")}: `}</label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
        />
      </div>
      <div>
        <label>{`${t("common:confirm_password")}: `}</label>
        <input
          {...register("confirmPassword", { required: true })}
          type="password"
        />
      </div>
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
  gap: 16,
});
