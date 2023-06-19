import styled from "@emotion/styled";
import { forwardRef } from "react";

type MainContentProps = {
  children?: React.ReactNode;
};

export const MainContent = forwardRef<HTMLDivElement | null, MainContentProps>(
  ({ children }, ref) => {
    return (
      <MainContentWrapper ref={ref}>
        <MainContentContainer>{children}</MainContentContainer>
      </MainContentWrapper>
    );
  }
);

MainContent.displayName = "MainContent";

const MainContentWrapper = styled.section({
  display: "grid",
  gridArea: "2 / 1 / 8 / 9",
  overflowY: "auto",
  padding: 8,
});

const MainContentContainer = styled.div({
  display: "flex",
  justifySelf: "center",
  justifyContent: "center",
  maxWidth: 1024,
  width: "100%",
});
