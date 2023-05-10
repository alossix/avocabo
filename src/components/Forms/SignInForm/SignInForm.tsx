import { Button } from "@/components/UI/Button";
import { TextInput } from "@/components/UI/TextInput";
import { Toast } from "@/components/UI/Toast";
import { useAppSelector } from "@/store/hooks";
import { selectError, setAppError, signInAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInFormData>();
  const appErrorMessage = useAppSelector(selectError);
  const [showErrorMessage, setShowErrorMessage] =
    useState<string>(appErrorMessage);
  const dispatch = useAppDispatch();

  const submitForm = async (data: SignInFormData) => {
    const { email, password } = data;

    if (!email) {
      dispatch(setAppError(t("common:email_required")));
      return;
    }

    if (!password) {
      dispatch(setAppError(t("common:password_required")));
      return;
    }

    await dispatch(signInAuth(email, password));
  };

  const onSubmit = handleSubmit(submitForm);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    dispatch(setAppError(""));
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    const fieldErrors = Object.values(errors)
      .filter((error) => error !== undefined)
      .map((error) => error.message || "");
    if (fieldErrors.length > 0) {
      const message = fieldErrors[0];
      if (message !== showErrorMessage) {
        setShowErrorMessage(message);
      }
    } else if (appErrorMessage && appErrorMessage !== showErrorMessage) {
      setShowErrorMessage(appErrorMessage);
    } else {
      setShowErrorMessage("");
    }
    // Clear the appErrorMessage after 10 seconds
    const timeout = setTimeout(() => {
      dispatch(setAppError(""));
    }, 10000);

    // Clear the timeout when the component unmounts or appErrorMessage changes
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appErrorMessage, errors, dispatch]);

  return (
    <StyledForm
      onSubmit={onSubmit}
      name="sign_in_form"
      onKeyDown={handleKeyDown}
    >
      <InputContainer>
        <TextInput
          id="email"
          labelText={t("common:email")}
          type="email"
          register={register("email")}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="password"
          labelText={t("common:password")}
          type="password"
          register={register("password")}
        />
      </InputContainer>
      <Button
        ariaLabel={t("common:sign_in")}
        title={t("common:sign_in")}
        type="submit"
      >
        {t("common:sign_in")}
      </Button>
      {showErrorMessage && (
        <Toast
          duration={10000}
          onClose={() => setShowErrorMessage("")}
          toastType="error"
          toastText={showErrorMessage}
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
