import { RecallDifficulty, Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { LearningStepperButtonExample } from "../LearningStepperButtonExample";

import { Dispatch, SetStateAction } from "react";
type LearningStepperExampleProps = {
  setMessageText?: Dispatch<SetStateAction<string>>;
  vocabWord: Vocab;
};

export const LearningStepperExample: React.FC<LearningStepperExampleProps> = ({
  setMessageText,
  vocabWord,
}) => {
  const { t } = useTranslation("common");

  const recallDifficulties: RecallDifficulty[] = [
    "easy",
    "medium",
    "hard",
    "forgot",
  ];

  return (
    <LearningStepperContainer aria-label={t("common:button_recall_label")}>
      {recallDifficulties.map((recallDifficulty) => (
        <LearningStepperButtonExample
          key={recallDifficulty}
          recallDifficulty={recallDifficulty}
          setMessageText={setMessageText}
          vocabId={vocabWord.vocabId}
        />
      ))}
    </LearningStepperContainer>
  );
};

const LearningStepperContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "auto",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: 8,

  "& > *:nth-of-type(4)": {
    gridColumn: "1 / span 3",
  },
});
