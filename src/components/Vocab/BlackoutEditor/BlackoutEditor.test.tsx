import { fireEvent, render, screen } from "@testing-library/react";
import { BlackoutEditor } from "./BlackoutEditor";

describe("BlackoutEditor", () => {
  const setBlackoutWords = jest.fn();
  const defaultProps = {
    definition: "the test",
    description: "I see a description of the test",
    setBlackoutWords: setBlackoutWords,
  };

  const renderComponent = (props = defaultProps) => {
    const { unmount } = render(<BlackoutEditor {...props} />);
    return unmount;
  };

  let unmount: () => void;

  afterEach(() => {
    unmount();
    jest.clearAllMocks();
  });

  it("renders the BlackoutEditor with a label", () => {
    unmount = renderComponent();
    expect(screen.getByText(/Blackout \*/i)).toBeInTheDocument();
  });

  it("renders the description text as clickable words", () => {
    unmount = renderComponent();
    const wordSpans = screen.getAllByText(/Test|description/i);
    expect(wordSpans.length).toBeGreaterThan(0);
    wordSpans.forEach((span) => {
      expect(span.tagName).toBe("SPAN");
    });
  });

  it("calls setBlackoutWords when a word is clicked", () => {
    unmount = renderComponent();
    fireEvent.click(screen.getByText(/Test/i));
    expect(setBlackoutWords).toHaveBeenCalledTimes(1);
  });

  it("updates the highlighted words state when a word is clicked", () => {
    unmount = renderComponent();
    const testWord = screen.getByText(/Test/i);
    fireEvent.click(testWord);
    expect(testWord).toHaveStyle("background-color: #dcdcdc");
    fireEvent.click(testWord);
    expect(testWord).not.toHaveStyle("background-color: #dcdcdc");
  });
});
