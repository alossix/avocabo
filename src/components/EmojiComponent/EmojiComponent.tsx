import styled from "@emotion/styled";
import React from "react";

export const EmojiComponent: React.FC<{
  children?: React.ReactNode;
  emojiSymbol: React.ReactNode;
  word: string;
}> = ({ emojiSymbol }) => {
  return (
    <EmojiContainer>
      <span className="emoji" style={{ fontSize: 64 }}>
        {emojiSymbol}
      </span>
    </EmojiContainer>
  );
};

const EmojiContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
