import styled from "@emotion/styled";
import { LearningStepperButton } from "./LearningStepperButton";

type LearningStepperProps = {
  children?: React.ReactNode;
};

export const LearningStepper: React.FC<LearningStepperProps> = ({
  children,
}) => {
  return (
    <LearningStepperContainer>
      <LearningStepperButton ease="easy" />
      <LearningStepperButton ease="medium" />
      <LearningStepperButton ease="difficult" />
    </LearningStepperContainer>
  );
};

const LearningStepperContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
