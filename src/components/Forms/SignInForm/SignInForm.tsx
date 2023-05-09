import { Button } from "@/components/UI/Button";
import { TextInput } from "@/components/UI/TextInput";
import { useAppSelector } from "@/store/hooks";
import { selectError, signInAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type SignInFormProps = {
  setErrorMessageText: (message: string) => void;
  setShowErrorMessage: (showMessage: boolean) => void;
};

type SignInFormData = {
  email: string;
  password: string;
};

export const SignInForm: React.FC<SignInFormProps> = ({
  setErrorMessageText,
  setShowErrorMessage,
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<SignInFormData>();
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectError);

  const submitForm = async (data: SignInFormData) => {
    const { email, password } = data;

    if (!email) {
      setShowErrorMessage(true);
      setErrorMessageText(t("common:email_required"));
      return;
    }

    if (!password) {
      setShowErrorMessage(true);
      setErrorMessageText(t("common:password_required"));
      return;
    }

    await dispatch(signInAuth(email, password));
  };

  const onSubmit = handleSubmit(submitForm);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setShowErrorMessage(false);
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setShowErrorMessage(true);
      setErrorMessageText(errorMessage);
    }
  }, [errorMessage, setErrorMessageText, setShowErrorMessage]);

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
