import React from "react";
const EmojiComponent: React.FC<{
  children?: React.ReactNode;
  symbol: React.ReactNode;
}> = ({ symbol }) => (
  <span className="emoji" style={{ fontSize: 64 }}>
    {symbol}
  </span>
);
export default EmojiComponent;
