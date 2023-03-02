import { Vocab } from "@/types/vocab";
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

  return (
    <div style={{ width: "100%" }}>
      <LearningStepperContainer aria-label={t("common:button_recall_label")}>
        <LearningStepperButton recallDifficulty="easy" vocabWord={vocabWord} />
        <LearningStepperButton
          recallDifficulty="medium"
          vocabWord={vocabWord}
        />
        <LearningStepperButton recallDifficulty="hard" vocabWord={vocabWord} />
        <LearningStepperButton
          recallDifficulty="forgot"
          vocabWord={vocabWord}
        />
      </LearningStepperContainer>
      <div>{vocabWord.currentStep}</div>
    </div>
  );
};

const LearningStepperContainer = styled.div({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
});
