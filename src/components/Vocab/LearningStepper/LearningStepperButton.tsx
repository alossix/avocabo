import { useAppDispatch } from "@/store/hooks";
import { changeVocabBoxDB } from "@/store/slices/vocabSlice";
import { theme } from "@/styles/theme";
import { StepperColorNames, StepperColors } from "@/types/design";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { ReactEventHandler } from "react";

type LearningStepperButtonProps = {
  recallDifficulty: RecallDifficulty;
  vocabWord: Vocab;
};

const stepperColors: StepperColors = {
  easy: "easyGreen",
  medium: "mediumOrange",
  hard: "hardRed",
  forgot: "forgotPurple",
};

export const LearningStepperButton: React.FC<LearningStepperButtonProps> = ({
  recallDifficulty,
  vocabWord,
}) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const color = theme.stepperColors[
    stepperColors[recallDifficulty]
  ] as StepperColorNames;

  const handleOnClick: ReactEventHandler<HTMLButtonElement> = () => {
    dispatch(changeVocabBoxDB({ vocabWord, recallDifficulty }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOnClick(event);
    }
  };

  return (
    <Button
      type="button"
      recallDifficulty={recallDifficulty}
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      aria-label={t(`common:button_recall_${recallDifficulty}`)}
      color={color}
    >
      {t(`common:button_recall_${recallDifficulty}`)}
    </Button>
  );
};

const Button = styled.button<{
  recallDifficulty: RecallDifficulty;
  color: StepperColorNames;
}>(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  padding: 8,
  textTransform: "capitalize",
  cursor: "pointer",
  backgroundColor: "white",
  color: color,
  border: `2px solid ${color}`,
  borderRadius: 4,
  minWidth: "20%",
  flexGrow: 1,

  "&:hover": {
    backgroundColor: color,
    borderColor: color,
    color: "white",
  },
}));
