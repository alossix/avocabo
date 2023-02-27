import styled from "@emotion/styled";

export const Sidebar: React.FC = () => {
  return (
    <SidebarContent aria-label="sidebar" role="complementary">
      Sidebar
    </SidebarContent>
  );
};

const SidebarContent = styled.aside({
  display: "flex",
  flexDirection: "column",
  border: "2px solid coral",
  gridArea: "2 / 1 / 5 / 2",
  padding: 8,
});
