import { VocabCard } from "@/components/Vocab/VocabCard";
import { AppUser } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

type MyVocabPageViewProps = {
  currentUser: AppUser;
};

export const MyVocabPageView: React.FC<MyVocabPageViewProps> = ({
  currentUser,
}) => {
  const { t } = useTranslation("vocab");
  const vocabList = currentUser.vocab;

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      <VocabCardsContainer>
        {vocabList.map((vocabWord) => (
          <VocabCard vocabWord={vocabWord} key={vocabWord.emojiId} />
        ))}
      </VocabCardsContainer>
    </VocabWindowContainer>
  );
};

const VocabWindowContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  overflowX: "scroll",
});

const VocabCardsContainer = styled.div({
  display: "flex",
  gap: 8,
  overflowX: "scroll",
});
