import { mockVocabEntry } from "@/lib/testUtils";
import { RecallDifficulty } from "@/types/vocab";
import { fireEvent, render, screen } from "@testing-library/react";
import { LearningStepperButton } from "./LearningStepperButton";

const mockChangeVocabBox = jest.fn();

jest.mock("@/hooks/useVocab", () => ({
  useVocab: () => ({
    changeVocabBox: mockChangeVocabBox,
  }),
}));

const expectedVocabWord = {
  currentBox: mockVocabEntry.currentBox,
  vocabId: mockVocabEntry.vocabId,
};

describe("LearningStepperButton", () => {
  const renderComponent = (recallDifficulty: RecallDifficulty) =>
    render(
      <LearningStepperButton
        recallDifficulty={recallDifficulty}
        currentBox={mockVocabEntry.currentBox}
        dueDate={mockVocabEntry.dueDate}
        vocabId={mockVocabEntry.vocabId}
      />
    );

  afterEach(() => {
    mockChangeVocabBox.mockClear();
  });

  it("renders the button with the correct label", () => {
    renderComponent("easy");
    expect(
      screen.getByLabelText(/common:button_recall_easy/i)
    ).toBeInTheDocument();
  });

  it("calls changeVocabBox with the correct parameters when clicked", () => {
    renderComponent("easy");
    fireEvent.click(screen.getByLabelText(/common:button_recall_easy/i));
    expect(mockChangeVocabBox).toHaveBeenCalledWith({
      recallDifficulty: "easy",
      vocabWord: expectedVocabWord,
    });
  });

  it("calls changeVocabBox with the correct parameters when pressing Enter key", () => {
    renderComponent("easy");
    fireEvent.keyDown(screen.getByLabelText(/common:button_recall_easy/i), {
      key: "Enter",
    });
    expect(mockChangeVocabBox).toHaveBeenCalledWith({
      recallDifficulty: "easy",
      vocabWord: expectedVocabWord,
    });
  });

  it("calls changeVocabBox with the correct parameters when pressing Space key", () => {
    renderComponent("easy");
    fireEvent.keyDown(screen.getByLabelText(/common:button_recall_easy/i), {
      key: " ",
    });
    expect(mockChangeVocabBox).toHaveBeenCalledWith({
      recallDifficulty: "easy",
      vocabWord: expectedVocabWord,
    });
  });
});
