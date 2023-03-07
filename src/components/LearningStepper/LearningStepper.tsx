import { RecallDifficulty, Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { LearningStepperButton } from "./LearningStepperButton";

type LearningStepperProps = {
  vocabWord: Vocab;
};

export const LearningStepper: React.FC<LearningStepperProps> = ({
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
        <LearningStepperButton
          recallDifficulty={recallDifficulty}
          key={recallDifficulty}
          vocabWord={vocabWord}
        />
      ))}
    </LearningStepperContainer>
  );
};

const LearningStepperContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
