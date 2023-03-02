import { useAppDispatch } from "@/store/hooks";
import { changeVocabStep } from "@/store/vocabSlice";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { ReactEventHandler, SyntheticEvent } from "react";

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
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const handleOnClick: ReactEventHandler<HTMLButtonElement> = (
    event: SyntheticEvent
  ) => {
    dispatch(changeVocabStep({ emojiId: vocabWord.emojiId, recallDifficulty }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOnClick(event);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Button
      type="button"
      recallDifficulty={recallDifficulty}
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      aria-label={t(`common:button_recall_${recallDifficulty}`)}
    >
      {t(`common:button_recall_${recallDifficulty}`)}
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
