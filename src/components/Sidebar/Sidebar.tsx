import styled from "@emotion/styled";

export const Sidebar: React.FC = () => {
  return (
    <SidebarContent aria-label="sidebar" role="complementary">
      Sidebar content here
    </SidebarContent>
  );
};

const SidebarContent = styled.aside({
  display: "flex",
  flexDirection: "column",
  gridArea: "2 / 1 / 8 / 3",
  padding: 8,
  border: "2px solid green",
  minWidth: 200,
});
