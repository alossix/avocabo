import { useEffect, useState, useCallback } from "react";

type UseWordHighlightingProps = {
  blackoutWords?: { [key: number]: number };
};

export const useWordHighlighting = ({
  blackoutWords,
}: UseWordHighlightingProps) => {
  const [highlightedRanges, setHighlightedRanges] = useState<{
    [key: number]: number;
  }>(blackoutWords || {});

  useEffect(() => {
    setHighlightedRanges(blackoutWords || {});
  }, [blackoutWords]);

  const isRangeHighlighted = useCallback(
    (start: number, end: number) => {
      return highlightedRanges[start] === end;
    },
    [highlightedRanges]
  );

  return { isRangeHighlighted };
};
