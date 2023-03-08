import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styled from "@emotion/styled";

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

const PageWrapper = styled.main({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gridTemplateRows: "4rem repeat(7, 1fr)",
  height: "100vh",
});

const MainContent = styled.section({
  display: "flex",
  gridArea: "2 / 1 / 8 / 9",
  overflowY: "auto",
  padding: 8,
});
