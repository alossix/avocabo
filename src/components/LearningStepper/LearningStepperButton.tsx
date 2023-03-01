import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { incrementVocabStep } from "@/store/vocabSlice";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler } from "react";

type LearningStepperButtonProps = {
  recallDifficulty: RecallDifficulty;
  vocabWord: Vocab;
};

const stepColors = {
  easy: {
    backgroundColor: "green",
    borderColor: "green",
    color: "green",
  },
  medium: {
    backgroundColor: "darkOrange",
    borderColor: "darkOrange",
    color: "darkOrange",
  },
  hard: {
    backgroundColor: "red",
    borderColor: "red",
    color: "red",
  },
  forgot: {
    backgroundColor: "purple",
    borderColor: "purple",
    color: "purple",
  },
};

export const LearningStepperButton: React.FC<LearningStepperButtonProps> = ({
  recallDifficulty,
  vocabWord,
}) => {
  const dispatch = useAppDispatch();

  const handleOnClick: ReactEventHandler<HTMLButtonElement> = () => {
    dispatch(
      incrementVocabStep({ emojiId: vocabWord.emojiId, recallDifficulty })
    );
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

const Button = styled.button<{ recallDifficulty: RecallDifficulty }>(
  ({ recallDifficulty }) => ({
    display: "flex",
    padding: 8,
    textTransform: "capitalize",
    cursor: "pointer",
    backgroundColor: "white",
    color: stepColors[recallDifficulty].color,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: stepColors[recallDifficulty].borderColor,
    borderRadius: 4,

    "&:hover": {
      backgroundColor: stepColors[recallDifficulty].backgroundColor,
      borderColor: stepColors[recallDifficulty].borderColor,
      color: "white",
    },
  })
);
