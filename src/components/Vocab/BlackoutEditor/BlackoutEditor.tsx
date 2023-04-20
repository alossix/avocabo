import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

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
  blackoutWords?: { [key: number]: number };
  definition: string;
  description: string;
  setBlackoutWords: (blackoutWordsData: { [key: number]: number }) => void;
};

export const BlackoutEditor: React.FC<BlackoutEditorProps> = ({
  blackoutWords,
  description,
  setBlackoutWords,
}) => {
  const [highlightedRanges, setHighlightedRanges] = useState<{
    [key: number]: number;
  }>(blackoutWords || {});

  useEffect(() => {
    setHighlightedRanges(blackoutWords || {});
  }, [blackoutWords]);

  const onClick = (start: number, end: number) => {
    const newHighlightedRanges = { ...highlightedRanges };
    if (start in newHighlightedRanges) {
      delete newHighlightedRanges[start];
    } else {
      newHighlightedRanges[start] = end;
    }
    setHighlightedRanges(newHighlightedRanges);
    setBlackoutWords(newHighlightedRanges);
  };

  const isRangeHighlighted = (start: number, end: number) => {
    return highlightedRanges[start] === end;
  };

  let currentPosition = 0;
  const words = description.split(/(\s+)/).map((word, index) => {
    const isSpace = /^\s+$/.test(word);
    const start = currentPosition;
    const end = start + word.length;
    currentPosition = end;

    const isHighlighted = !isSpace && isRangeHighlighted(start, end);

    return (
      <span
        key={index}
        onClick={!isSpace ? () => onClick(start, end) : undefined}
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

  return (
    <BlackoutContainer>
      <BlackoutLabel>
        <p>Blackout</p>
      </BlackoutLabel>
      <p>{words}</p>
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
