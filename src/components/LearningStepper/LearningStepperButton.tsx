import { Ease } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler } from "react";

type LearningStepperButtonProps = Ease;

export const LearningStepperButton: React.FC<LearningStepperButtonProps> = ({
  ease,
}) => {
  const handleOnClick: ReactEventHandler = () => {
    console.log(`clicked ${ease}`);
  };
  return (
    <Button ease={ease} onClick={handleOnClick}>
      {ease}
    </Button>
  );
};

const Button = styled.button<Ease>(({ ease }) => ({
  display: "flex",
  padding: 8,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor:
    ease === "easy" ? "green" : ease === "medium" ? "darkOrange" : "red",
  borderRadius: 4,
  backgroundColor: "white",
  color: ease === "easy" ? "green" : ease === "medium" ? "darkOrange" : "red",
  textTransform: "capitalize",
  cursor: "pointer",
}));
