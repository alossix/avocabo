import { mockVocabEntry } from "@/lib/testUtils";
import { store } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { LearningStepper } from "./LearningStepper";

describe("LearningStepper", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LearningStepper vocabWord={mockVocabEntry} />
      </Provider>
    );

  it("renders the LearningStepper with the correct aria-label", () => {
    renderComponent();
    expect(
      screen.getByLabelText(/common:button_recall_label/i)
    ).toBeInTheDocument();
  });

  it("renders all four LearningStepperButtons with the correct recallDifficulty prop", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);

    const difficulties = ["easy", "medium", "hard", "forgot"];
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute(
        "aria-label",
        expect.stringMatching(
          new RegExp(`common:button_recall_${difficulties[index]}`, "i")
        )
      );
    });
  });
});
