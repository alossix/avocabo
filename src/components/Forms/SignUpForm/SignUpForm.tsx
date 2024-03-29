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
import {
  VocabPackCommonNounLanguages,
  VocabPackCommonNouns,
  VocabPackList,
  VocabPackRareNounLanguages,
  VocabPackRareNouns,
} from "@/lib/vocab";

type SignUpFormData = {
  confirmPassword: string;
  displayName: string;
  email: string;
  password: string;
  vocabPacks: VocabPackList;
};

export const SignUpForm: React.FC = () => {
  const { lang, t } = useTranslation("common");
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({ shouldUnregister: false });
  const [learningLanguage, setLearningLanguage] = useState<LearningLanguages>(
    lang as LearningLanguages
  );
  const appErrorMessage = useAppSelector(selectError);
  const [showErrorMessage, setShowErrorMessage] =
    useState<string>(appErrorMessage);
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

    setTimeout(() => {
      dispatch(setAppError(""));
    }, 10000);
  };

  const handleSignupSubmit = async (data: SignUpFormData) => {
    const { displayName, email, password, confirmPassword, vocabPacks } = data;

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
    const filteredVocabPacks: VocabPackList = {};

    for (const key in vocabPacks) {
      if (Object.prototype.hasOwnProperty.call(vocabPacks, key)) {
        const language = vocabPacks[key as keyof VocabPackList]?.language;

        if (language) {
          if (
            key === "commonNouns" &&
            VocabPackCommonNounLanguages.includes(
              learningLanguage as VocabPackCommonNouns
            )
          ) {
            filteredVocabPacks.commonNouns = {
              language: learningLanguage as VocabPackCommonNouns,
            };
          } else if (key === "rareNouns" && learningLanguage === "ca") {
            filteredVocabPacks.rareNouns = {
              language: "ca",
            };
          }
        }
      }
    }

    dispatch(
      createUserAuth({
        displayName,
        email,
        interfaceLanguage: lang as InterfaceLanguages,
        learningLanguage,
        password,
        vocabPacks: filteredVocabPacks,
      })
    );
  };

  const onSubmit = handleSubmit(handleSignupSubmit);

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
      const message = getErrorMessage(fieldErrors[0]);
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
  }, [appErrorMessage, dispatch, errors]);

  const getVocabPackOptions = (): VocabPackList => {
    const vocabPacks: VocabPackList = {};

    if (
      VocabPackCommonNounLanguages.includes(
        learningLanguage as VocabPackCommonNouns
      )
    ) {
      vocabPacks.commonNouns = {
        language: learningLanguage as VocabPackCommonNouns,
      };
    }

    if (
      VocabPackRareNounLanguages.includes(
        learningLanguage as VocabPackRareNouns
      )
    ) {
      vocabPacks.rareNouns = {
        language: learningLanguage as VocabPackRareNouns,
      };
    }

    return vocabPacks;
  };

  return (
    <StyledForm
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
          justifyContent: "space-between",
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
          id="language-selector-signup"
          languageSet={"learning"}
          selectedLanguage={learningLanguage}
          showIcon={false}
        />
      </InputContainer>
      {learningLanguage !== "other" && (
        <div>
          <h3>{t("common:select_vocab_pack")}</h3>
          <InputContainer
            style={{
              alignItems: "flex-end",
              gap: 16,
              padding: "16px 0px",
            }}
          >
            {Object.entries(getVocabPackOptions()).map(([key, vocabPack]) => (
              <div style={{ display: "flex", gap: 16 }} key={key}>
                <label htmlFor={`vocabPack-${key}`}>
                  {t(`common:vocab_pack_${key}`)}
                </label>
                <input
                  id={`vocabPack-${key}`}
                  {...register(
                    `vocabPacks.${key}.language` as keyof SignUpFormData
                  )}
                  type="checkbox"
                  value={vocabPack.language}
                />
              </div>
            ))}
          </InputContainer>
        </div>
      )}

      <Button ariaLabel="" title={t("common:sign_up")} type="submit">
        {t("common:sign_up")}
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
