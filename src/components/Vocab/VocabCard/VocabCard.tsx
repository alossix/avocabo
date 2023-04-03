import { formatDateYearMonthDay } from "@/lib/dates";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { ReactEventHandler, useState } from "react";
import { EditVocabModal } from "../EditVocabModal";
import { LearningStepper } from "../LearningStepper";
import EditVocabIcon from "/public/icons/edit-vocab-icon.svg";

type VocabCardProps = {
  vocabWord: Vocab;
};

export const VocabCard: React.FC<VocabCardProps> = ({ vocabWord }) => {
  const { t } = useTranslation("vocab");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dueDate = formatDateYearMonthDay(vocabWord.dueDate);

  const handleOnShowDetailsClick: ReactEventHandler<HTMLDivElement> = () => {
    if (!showDetails) {
      setShowDetails(true);
    }
  };

  const handleOnShowDetailsKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOnShowDetailsClick(event);
    }
  };

  const handleEditButtonClick = () => {
    setOpenModal(() => !openModal);
  };

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
        <p style={{ color: theme.colors.superDarkGrey, fontSize: 12 }}>{`${t(
          "vocab:vocab_due_date"
        )}: ${dueDate}`}</p>

        <EditButton
          aria-label={t("vocab:vocab_edit_entry_title")}
          onClick={handleEditButtonClick}
          onKeyDown={(e) => e.key === "Enter" && handleEditButtonClick()}
          role="button"
          showDetails={showDetails}
          tabIndex={0}
        >
          <Image alt="edit-vocab" src={EditVocabIcon} width={20} height={20} />
        </EditButton>

        <EditVocabModal
          isOpen={openModal}
          setOpenModal={() => setOpenModal(!openModal)}
          vocabWord={vocabWord}
        />
      </TopRowDetails>

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
      <DescriptionContainer>
        <p>{vocabWord.description}</p>
      </DescriptionContainer>

      <HR />
      {showDetails ? (
        <>
          <WordContainer>
            <p>{vocabWord.definition}</p>
          </WordContainer>
          <LearningStepper vocabWord={vocabWord} />
        </>
      ) : (
        <>
          <div style={{ color: theme.colors.superDarkGrey }}>
            <p>{`${t("vocab:vocab_reveal_word")}...`}</p>
          </div>
          <Hidden>
            <LearningStepper vocabWord={vocabWord} />
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
  borderRadius: 4,
  border: `1px solid ${theme.colors.lightGrey}`,
  padding: 8,
  maxWidth: "100%",
  height: 432,
  cursor: !showDetails ? "pointer" : "default",
  gap: 16,
}));

const TopRowDetails = styled.div<{ showDetails: boolean }>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const EditButton = styled.button<{ showDetails: boolean }>(
  ({ showDetails }) => ({
    cursor: "pointer",
    padding: 0,
    height: 20,
    backgroundColor: "transparent",
    border: "none",
    lineHeight: 1,
    visibility: showDetails ? "visible" : "hidden",

    "&:hover": {
      opacity: 0.6,
    },
  })
);

const ImageWrapper = styled.div({
  display: "flex",
  flexGrow: 1,
  position: "relative",
  width: "100%",
  height: 200,

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: 336,
  },
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
  color: theme.colors.superDarkGrey,
});

const HR = styled.hr({
  width: "100%",
  height: 1,
  border: "none",
  borderTop: `1px solid ${theme.colors.mediumGrey}`,
  margin: 0,
});

const WordContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const Hidden = styled.div({
  visibility: "hidden",
});
