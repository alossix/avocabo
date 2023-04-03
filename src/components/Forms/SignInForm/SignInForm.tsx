import { Button } from "@/components/UI/Button";
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

  const onSubmit = async (data: SignInFormData) => {
    try {
      await dispatch(signInAuth(data.email, data.password));
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} name="sign_in_form">
      <InputContainer>
        <label>{`${t("common:email")}: `}</label>
        <input type="email" {...register("email", { required: true })} />
      </InputContainer>
      <InputContainer>
        <label>{`${t("common:password")}: `}</label>
        <input type="password" {...register("password", { required: true })} />
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
