import styled from "@emotion/styled";

type MainContentProps = {
  children?: React.ReactNode;
  ref: React.ForwardedRef<HTMLDivElement | null>;
};

export const MainContent: React.FC<MainContentProps> = ({ children, ref }) => {
  return (
    <MainContentWrapper ref={ref}>
      <MainContentContainer>{children}</MainContentContainer>
    </MainContentWrapper>
  );
};

const MainContentWrapper = styled.section`
  display: grid;
  justify-items: center;
  grid-area: 2 / 1 / 8 / 9;
  overflow-y: auto;
  max-width: 100%;
  padding: 8px;
`;

const MainContentContainer = styled.div({
  display: "flex",
  width: "100%",
  maxWidth: 1024,
});
