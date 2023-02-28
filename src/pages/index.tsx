import { Sidebar } from "@/components/Sidebar";
import { VocabWindow } from "@/components/VocabWindow";
import styled from "@emotion/styled";

const HomePage: React.FC = () => {
  return (
    <HomeContent>
      <Sidebar />
      <VocabWindow />
    </HomeContent>
  );
};
export default HomePage;

const HomeContent = styled.section({
  display: "flex",
  width: "100%",
});
