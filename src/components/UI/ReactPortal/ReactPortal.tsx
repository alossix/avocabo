import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

type ReactPortalProps = {
  children: JSX.Element;
  wrapperId: string;
};

export const ReactPortal = ({ children, wrapperId }: ReactPortalProps) => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const existingWrapper = document.getElementById(wrapperId);

    if (existingWrapper) {
      setWrapper(existingWrapper);
      return;
    }

    const newWrapper = document.createElement("div");
    newWrapper.setAttribute("id", wrapperId);
    document.body.appendChild(newWrapper);
    setWrapper(newWrapper);

    return () => {
      document.body.removeChild(newWrapper);
    };
  }, [wrapperId]);

  if (!wrapper) return null;

  return createPortal(children, wrapper);
};
