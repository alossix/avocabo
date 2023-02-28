import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL>
          <HeaderLI>
            <Link href="/">Study Vocab List</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href="/add-words">Add Words</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href="/subscribe">Subscribe</Link>
          </HeaderLI>
          <HeaderLI>Menu</HeaderLI>
        </HeaderUL>
      </HeaderContent>
    </HeaderNav>
  );
};

const HeaderNav = styled.nav({
  display: "flex",
  justifyContent: "space-between",
  gridArea: "1 / 1 / 2 / 9",
  padding: 8,
  border: "2px solid blue",
  width: "100%",
});

const HeaderContent = styled.header({
  display: "flex",
  width: "100%",
});

const HeaderUL = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  listStyle: "none",
  padding: 0,
});

const HeaderLI = styled.li({
  display: "flex",
  alignItems: "center",
});
