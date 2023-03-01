import { RecallDifficulty } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler } from "react";

type LearningStepperButtonProps = { recallDifficulty: RecallDifficulty };

export const LearningStepperButton: React.FC<LearningStepperButtonProps> = ({
  recallDifficulty,
}) => {
  const handleOnClick: ReactEventHandler<HTMLButtonElement> = () => {
    console.log(`clicked ${recallDifficulty}`);
  };
  return (
    <Button
      type="button"
      recallDifficulty={recallDifficulty}
      onClick={handleOnClick}
    >
      {recallDifficulty}
    </Button>
  );
};

const Button = styled.button<LearningStepperButtonProps>(
  ({ recallDifficulty }) => ({
    display: "flex",
    padding: 8,
    textTransform: "capitalize",
    cursor: "pointer",
    backgroundColor: "white",
    color:
      recallDifficulty === "easy"
        ? "green"
        : recallDifficulty === "medium"
        ? "darkOrange"
        : "red",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor:
      recallDifficulty === "easy"
        ? "green"
        : recallDifficulty === "medium"
        ? "darkOrange"
        : "red",
    borderRadius: 4,

    "&:hover": {
      backgroundColor:
        recallDifficulty === "easy"
          ? "green"
          : recallDifficulty === "medium"
          ? "darkOrange"
          : "red",
      borderColor:
        recallDifficulty === "easy"
          ? "green"
          : recallDifficulty === "medium"
          ? "darkOrange"
          : "red",
      color: "white",
    },
  })
);
