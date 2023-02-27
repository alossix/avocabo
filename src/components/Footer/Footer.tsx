import styled from "@emotion/styled";

export const Footer: React.FC = () => {
  return (
    <FooterContent>
      <p>Footer first</p>
      <p>Footer second</p>
    </FooterContent>
  );
};

const FooterContent = styled.footer({
  display: "flex",
  justifyContent: "space-between",
  border: "2px solid green",
  gridArea: "5 / 1 / 6 / 6",
  padding: 8,
});
