import styled from "@emotion/styled";

export const Header: React.FC = () => {
  return (
    <HeaderContent>
      <p>Study Vocab List</p>
      <p>Add Words</p>
      <p>Menu</p>
    </HeaderContent>
  );
};

const HeaderContent = styled.header({
  display: "flex",
  justifyContent: "space-between",
  gridArea: "1 / 1 / 2 / 9",
  padding: 8,
  border: "2px solid blue",
});
