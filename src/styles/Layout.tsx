import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styled from "@emotion/styled";
import { theme } from "./theme";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </PageWrapper>
  );
};
export default Layout;

const PageWrapper = styled.main`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 3rem repeat(7, 1fr);
  height: 100vh;

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-rows: 4rem repeat(6, 1fr) auto;
  }
`;
const MainContent = styled.section`
  display: flex;
  grid-area: 2 / 1 / -1 / 9;
  overflow-y: auto;
  padding: 8px;
`;
