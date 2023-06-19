import { Footer } from "@/components/UI/Footer";
import { Header } from "@/components/UI/Header";
import { MainContent } from "@/components/UI/MainContent";
import styled from "@emotion/styled";
import { useRef } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <PageWrapper>
      <Header mainContentRef={mainContentRef} />
      <MainContent ref={mainContentRef}>{children}</MainContent>
      <Footer />
    </PageWrapper>
  );
};
export default Layout;

const PageWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 3rem repeat(6, 1fr);
  height: 100vh;
`;
