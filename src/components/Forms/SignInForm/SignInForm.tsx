import { Button } from "@/components/Button";
import { signInAuth } from "@/store/slices/authSlice";
import { RootState, useAppDispatch } from "@/store/store";
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
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="sign_in_form">
      <div>
        <label>{`${t("common:email")}: `}</label>
        <input type="email" {...register("email", { required: true })} />
      </div>
      <div>
        <label>{`${t("common:password")}: `}</label>
        <input type="password" {...register("password", { required: true })} />
      </div>
      <Button
        ariaLabel={t("common:sign_in")}
        title={t("common:sign_in")}
        type="submit"
      >
        {t("common:sign_in")}
      </Button>
    </form>
  );
};
