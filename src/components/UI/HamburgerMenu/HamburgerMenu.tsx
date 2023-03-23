import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { SetStateAction } from "react";

type HamburgerMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: SetStateAction<boolean>) => void;
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <>
      <Checkbox
        type="checkbox"
        onChange={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <HamburgerLines>
        <Line mobileMenuOpen={mobileMenuOpen} className="line1" />
        <Line mobileMenuOpen={mobileMenuOpen} className="line2" />
        <Line mobileMenuOpen={mobileMenuOpen} className="line3" />
      </HamburgerLines>
    </>
  );
};

const Checkbox = styled.input`
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  right: 0;
  z-index: 4;
  opacity: 0;
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

const HamburgerLines = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
  height: 26px;
  width: 32px;
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

const Line = styled.span<{ mobileMenuOpen: boolean }>`
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: ${theme.colors.black};

  &.line1 {
    transform-origin: 0% 0%;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.mobileMenuOpen ? "rotate(45deg)" : "none")};
  }

  &.line2 {
    transition: transform 0.2s ease-in-out, opacity 0.1s ease-in-out;
    transform: ${(props) =>
      props.mobileMenuOpen ? "translateX(-10%)" : "none"};
    opacity: ${(props) => (props.mobileMenuOpen ? "0" : "1")};
  }

  &.line3 {
    transform-origin: 0% 100%;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.mobileMenuOpen ? "rotate(-45deg)" : "none")};
  }
`;
