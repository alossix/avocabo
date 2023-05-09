import { store } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { DeleteWord } from "./DeleteWord";

const setOpenModal = jest.fn();
const mockVocabId = "1";
const mockVocabImageURL = "example.org/mock";

describe("DeleteWord", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <DeleteWord
          imageURL={mockVocabImageURL}
          setOpenModal={setOpenModal}
          vocabId={mockVocabId}
        />
      </Provider>
    );

  it("renders the DeleteWord button with the correct aria-label", () => {
    renderComponent();
    expect(
      screen.getByLabelText(/common:button_delete_word/i)
    ).toBeInTheDocument();
  });
});
