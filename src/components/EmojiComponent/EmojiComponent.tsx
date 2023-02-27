import styled from "@emotion/styled";
import React from "react";

const EmojiComponent: React.FC<{
  children?: React.ReactNode;
  onClick: VoidFunction;
  showWord: boolean;
  emojiSymbol: React.ReactNode;
  word: string;
}> = ({ onClick, showWord, emojiSymbol, word }) => {
  return (
    <EmojiContainer onClick={onClick}>
      <span className="emoji" style={{ fontSize: 64 }}>
        {emojiSymbol}
      </span>
      {showWord && <p>{word}</p>}
    </EmojiContainer>
  );
};
export default EmojiComponent;

const EmojiContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
