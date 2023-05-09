import { Button } from "@/components/UI/Button";
import { deleteUserAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import { AppUser, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

type ProfilePageViewProps = {
  currentUser: AppUser;
  vocabCount: number;
};

export const ProfilePageView: React.FC<ProfilePageViewProps> = ({
  currentUser,
  vocabCount,
}) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const languageLabelsLearning: Record<LearningLanguages, string> = {
    ca: "Català",
    en: "English",
    es: "Español",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    nl: "Nederlands",
    uk: "Українська",
    other: `${t("common:other")}`,
  };
  const languageName = languageLabelsLearning[currentUser.learningLanguage];

  const handleDeleteAccount = () => {
    if (window.confirm(t("common:confirm_delete_account"))) {
      dispatch(deleteUserAuth());
    }
  };

  return (
    <ProfilePageContainer>
      <h1>{t("common:header_profile")}</h1>
      <div>
        <h3>{t("common:profile_name")}</h3>
        <p>{currentUser.displayName}</p>
      </div>
      <div>
        <h3>{t("common:email")}</h3>
        <p>{currentUser.email}</p>
      </div>
      <div>
        <h3>{t("common:number_of_vocab_entries")}</h3>
        <p>{vocabCount}</p>
      </div>
      <div>
        <h3>{t("common:learning_language_simple")}</h3>
        <p>{languageName}</p>
      </div>
      <div>
        <h3 style={{ color: theme.colors.UIRed }}>
          {t("common:delete_account")}
        </h3>
        <Button
          ariaLabel={t("common:delete_account")}
          colorSet="red"
          onClick={handleDeleteAccount}
          title={t("common:delete_account")}
        >
          {t("common:delete_account")}
        </Button>
      </div>
    </ProfilePageContainer>
  );
};

const ProfilePageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});
