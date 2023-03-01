import styled from "@emotion/styled";
import React from "react";

export const EmojiComponent: React.FC<{
  children?: React.ReactNode;
  emojiId: React.ReactNode;
  word: string;
}> = ({ emojiId }) => {
  return (
    <EmojiContainer>
      <span className="emoji" style={{ fontSize: 64 }}>
        {emojiId}
      </span>
    </EmojiContainer>
  );
};

const EmojiContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
