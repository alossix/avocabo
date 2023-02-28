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
  gridArea: "8 / 1 / 9 / 9",
  padding: 8,
  border: "2px solid purple",
});
