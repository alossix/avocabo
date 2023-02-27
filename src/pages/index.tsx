import { Sidebar } from "@/components/Sidebar";
import { VocabWindow } from "@/components/VocabWindow";
import styled from "@emotion/styled";

const Home = () => {
  return (
    <HomeContent>
      <Sidebar />
      <VocabWindow />
    </HomeContent>
  );
};
export default Home;

const HomeContent = styled.section({
  display: "flex",
  width: "100%",
});
