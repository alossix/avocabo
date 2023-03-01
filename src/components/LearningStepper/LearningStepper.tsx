import styled from "@emotion/styled";
import { LearningStepperButton } from "./LearningStepperButton";

type LearningStepperProps = {};

export const LearningStepper: React.FC<LearningStepperProps> = () => {
  return (
    <LearningStepperContainer>
      <LearningStepperButton recallDifficulty="easy" />
      <LearningStepperButton recallDifficulty="medium" />
      <LearningStepperButton recallDifficulty="difficult" />
    </LearningStepperContainer>
  );
};

const LearningStepperContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
