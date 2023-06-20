import { theme } from "@/styles/theme";
import { StepperColorNames, StepperColors } from "@/types/design";
import { RecallDifficulty } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import React, { Dispatch, SetStateAction } from "react";

type LearningStepperButtonExampleProps = {
  recallDifficulty: RecallDifficulty;
  setMessageText?: Dispatch<SetStateAction<string>>;
  vocabId: string;
};

const stepperColors: StepperColors = {
  easy: "easyGreen",
  medium: "mediumOrange",
  hard: "hardRed",
  forgot: "forgotPurple",
};

export const LearningStepperButtonExample: React.FC<LearningStepperButtonExampleProps> =
  React.memo(({ recallDifficulty, setMessageText }) => {
    const { t } = useTranslation("common");

    const handleButtonClick = () => {
      const compiledMessage = t("common:example_marked", {
        recallDifficulty: `${t(`common:button_recall_${recallDifficulty}`)}`,
      });
      setMessageText && setMessageText(compiledMessage);
    };
    const color = theme.stepperColors[
      stepperColors[recallDifficulty]
    ] as StepperColorNames;

    return (
      <Button
        aria-label={t(`common:button_recall_${recallDifficulty}`)}
        color={color}
        onClick={handleButtonClick}
        recallDifficulty={recallDifficulty}
        type="button"
      >
        {t(`common:button_recall_${recallDifficulty}`)}
      </Button>
    );
  });

LearningStepperButtonExample.displayName = "LearningStepperButtonExample";

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
