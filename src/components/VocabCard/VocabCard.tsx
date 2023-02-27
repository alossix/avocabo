import styled from "@emotion/styled";

type VocabCardProps = {
  children?: React.ReactNode;
};

export const VocabCard: React.FC<VocabCardProps> = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

const CardWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  border: "1px solid grey",
  padding: 8,
  maxWidth: 256,
});
