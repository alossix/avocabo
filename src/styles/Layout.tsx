import styled from "@emotion/styled";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <PageWrapper>
      <Header>
        <>Vocab</>
        <>Menu</>
      </Header>
      <MainContent>{children}</MainContent>
      <Footer>
        <>Footer</>
        <>Second content</>
      </Footer>
    </PageWrapper>
  );
};
export default Layout;

const PageWrapper = styled.main({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});
const Header = styled.header({
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
  border: "2px solid red",
});

const MainContent = styled.section({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: "2px solid blue",
});

const Footer = styled.footer({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
