import styled from "@emotion/styled";
import EmojiComponent from "../EmojiComponent/EmojiComponent";

export const VocabWindow = () => {
  return (
    <VocabWindowSection>
      This is the main vocab window
      <EmojiComponent symbol="👑" />
    </VocabWindowSection>
  );
};

const VocabWindowSection = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
