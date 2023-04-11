import { Button } from "@/components/UI/Button";
import { TextInput } from "@/components/UI/TextInput";
import { handleAppError } from "@/lib/handleAppError";
import { setAppError, signInAuth } from "@/store/slices/authSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<SignInFormData>();
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useAppDispatch();

  const submitForm = async (data: SignInFormData) => {
    try {
      await dispatch(signInAuth(data.email, data.password));
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

  const onSubmit = handleSubmit(submitForm);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

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
          register={register("email", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="password"
          labelText={t("common:password")}
          type="password"
          register={register("password", { required: true })}
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
