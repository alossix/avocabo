import { formatDateYearMonthDay } from "@/lib/dates";
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
        <h5>{`${t("vocab:vocab_due_date")}: ${dueDate}`}</h5>
        <button
          type="button"
          onClick={() => handleEditButtonClick()}
          style={{
            height: 16,
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <Image src={EditVocabIcon} alt="edit-vocab" width={16} height={16} />
        </button>
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
            fill
            style={{ objectFit: "contain" }}
          />
        </ImageContainer>
      </ImageWrapper>

      {showDetails && (
        <>
          <HR />
          <WordContainer>
            <h5>{vocabWord.definition}</h5>
          </WordContainer>
          <LearningStepper vocabWord={vocabWord} />
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
  border: "1px solid lightgrey",
  padding: "16px 8px",
  minWidth: 336,
  minHeight: 336,
  cursor: !showDetails ? "pointer" : "default",
  gap: 16,
}));

const ImageWrapper = styled.div({
  display: "flex",
  flexGrow: 1,
  width: 336,
  height: 200,
  position: "relative",
});

const ImageContainer = styled.div({
  display: "flex",
  position: "relative",
  width: "100%",
});

const HR = styled.hr({
  width: "100%",
  height: 1,
  border: "none",
  borderTop: "1.5px solid lightgrey",
  margin: 0,
});

const WordContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const TopRowDetails = styled.div<{ showDetails: boolean }>(
  ({ showDetails }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    visibility: showDetails ? "visible" : "hidden",
  })
);
