import { useWordHighlighting } from "@/hooks/useWordHighlighting";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { LearningStepperExample } from "../LearningStepperExample";
import EditVocabIcon from "/public/icons/edit-vocab-icon.svg";
import { newShortDate } from "@/lib/datesAndTimes";

type VocabCardExampleProps = {
  vocabWord: Vocab;
};

export const VocabCardExample: React.FC<VocabCardExampleProps> = ({
  vocabWord,
}) => {
  const { t } = useTranslation("vocab");
  const { isRangeHighlighted } = useWordHighlighting({
    blackoutWords: vocabWord.blackoutWords,
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const dueDate = newShortDate();

  const handleOnShowDetailsClick: ReactEventHandler<HTMLDivElement> = () => {
    if (!showDetails) {
      setShowDetails(true);
    }
  };

  const handleOnShowDetailsKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOnShowDetailsClick(event);
    }
  };

  useEffect(() => {
    setShowDetails(false);
  }, [vocabWord]);

  let currentPosition = 0;
  const words = vocabWord.description?.split(/(\s+)/).map((word, index) => {
    const isSpace = /^\s+$/.test(word);
    const start = currentPosition;
    const end = start + word.length;
    currentPosition = end;

    const isHighlighted =
      !isSpace && !showDetails && isRangeHighlighted(start, end);

    return (
      <span
        key={index}
        style={{
          backgroundColor: isHighlighted
            ? theme.colors.lightBlack
            : "transparent",
          color: theme.colors.lightBlack,
        }}
      >
        {word}
      </span>
    );
  });

  return (
    <CardWrapper
      onClick={handleOnShowDetailsClick}
      onKeyDown={handleOnShowDetailsKeyDown}
      tabIndex={0}
      showDetails={showDetails}
      role="button"
      aria-label={vocabWord.definition}
      aria-pressed={showDetails}
    >
      <TopRowDetails showDetails={showDetails}>
        <p style={{ color: theme.colors.lightBlack, fontSize: 12 }}>
          {t("vocab:vocab_due_date", { dueDate })}
        </p>

        <EditButton
          aria-label={t("vocab:vocab_edit_entry_title")}
          role="button"
          tabIndex={0}
        >
          <Image alt="edit-vocab" src={EditVocabIcon} width={20} height={20} />
        </EditButton>
      </TopRowDetails>
      {vocabWord.imageURL && (
        <ImageWrapper>
          <ImageContainer>
            <Image
              src={vocabWord.imageURL}
              alt={vocabWord.definition}
              width={240}
              height={200}
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 240px"
              style={{ objectFit: "contain" }}
            />
          </ImageContainer>
        </ImageWrapper>
      )}
      <DescriptionContainer>
        <p>{words}</p>
      </DescriptionContainer>

      <HR />
      {showDetails ? (
        <>
          <WordContainer title={vocabWord.phoneticPronunciation}>
            <p>{vocabWord.definition}</p>
          </WordContainer>
          <LearningStepperExample vocabWord={vocabWord} />
        </>
      ) : (
        <>
          <div style={{ color: theme.colors.lightBlack }}>
            <p>{`${t("vocab:vocab_reveal_word")}...`}</p>
          </div>
          <Hidden>
            <LearningStepperExample vocabWord={vocabWord} />
          </Hidden>
        </>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ showDetails: boolean }>(({ showDetails }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 4,
  border: `1px solid ${theme.colors.lightGrey}`,
  padding: 8,
  backgroundColor: theme.colors.white,
  maxWidth: "100%",
  height: 440,
  cursor: !showDetails ? "pointer" : "default",
  gap: 16,

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: 336,
  },
}));

const TopRowDetails = styled.div<{ showDetails: boolean }>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const EditButton = styled.button({
  cursor: "pointer",
  padding: 0,
  height: 20,
  backgroundColor: "transparent",
  border: "none",
  lineHeight: 1,

  "&:hover": {
    opacity: 0.6,
  },
});

const ImageWrapper = styled.div({
  display: "flex",
  flexGrow: 1,
  position: "relative",
  width: "100%",
  height: 200,
});

const ImageContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  position: "relative",
  width: "100%",
});

const DescriptionContainer = styled.div({
  display: "flex",
  margin: "0px 16px",
  color: theme.colors.lightBlack,
});

const HR = styled.hr({
  width: "100%",
  height: 1,
  border: "none",
  borderTop: `1px solid ${theme.colors.mediumGrey}`,
  margin: 0,
});

const WordContainer = styled.div<{ title?: string }>({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Hidden = styled.div({
  visibility: "hidden",
});
