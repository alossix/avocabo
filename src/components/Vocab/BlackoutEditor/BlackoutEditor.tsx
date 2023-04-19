import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { useState } from "react";

// data structure: starting position in string, ending position in string?
// highlight on hover over word, but not spaces
// auto highlight if full word present in sentence
// highlight on mousein and unhighlight on mouseout
// description of feature
// confirmation button
// update vocab word
// implementation in vocabcard
// clear on edit definition or description

type BlackoutEditorProps = {
  definition: string;
  description: string;
  vocabId: string;
  onUpdateVocabWord: (vocabId: string, newWord: string) => void;
};

export const BlackoutEditor: React.FC<BlackoutEditorProps> = ({
  // definition,
  description,
  vocabId,
  onUpdateVocabWord,
}) => {
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);

  const onClick = (word: string) => {
    if (highlightedWords.includes(word)) {
      setHighlightedWords(highlightedWords.filter((w) => w !== word));
    } else {
      setHighlightedWords([...highlightedWords, word]);
    }
  };

  const isWordHighlighted = (word: string) => {
    return highlightedWords.some((highlightedWord) =>
      word.toLowerCase().includes(highlightedWord.toLowerCase())
    );
  };

  const words = description.split(/(\s+)/).map((word, index) => {
    const isSpace = /^\s+$/.test(word);
    const isHighlighted = !isSpace && isWordHighlighted(word);

    return (
      <span
        key={index}
        onClick={!isSpace ? () => onClick(word) : undefined}
        style={{
          backgroundColor: isHighlighted
            ? theme.colors.mediumGrey
            : "transparent",
          cursor: !isSpace ? "pointer" : "default",
        }}
      >
        {word}
      </span>
    );
  });

  const handleConfirm = () => {
    onUpdateVocabWord(vocabId, highlightedWords.join(" "));
  };

  return (
    <BlackoutContainer>
      <BlackoutLabel>
        <p>Blackout</p>
      </BlackoutLabel>
      <p>{words}</p>
      <button onClick={handleConfirm} disabled={!highlightedWords.length}>
        Confirm
      </button>
    </BlackoutContainer>
  );
};

const BlackoutContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

const BlackoutLabel = styled.div({
  marginBottom: 8,
});
