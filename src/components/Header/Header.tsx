import styled from "@emotion/styled";

export const Header: React.FC = () => {
  return (
    <HeaderContent>
      <p>Vocab</p>
      <p>Menu</p>
    </HeaderContent>
  );
};

const HeaderContent = styled.header({
  display: "flex",
  justifyContent: "space-between",
  border: "2px solid red",
  gridArea: "1 / 1 / 2 / 6",
  padding: 8,
});
