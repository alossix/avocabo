import { store } from "@/store/store";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { DeleteWord } from "./DeleteWord";
import { act } from "react-dom/test-utils";

const setOpenModal = jest.fn();
const mockVocabId = "1";

describe("DeleteWord", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <DeleteWord setOpenModal={setOpenModal} vocabId={mockVocabId} />
      </Provider>
    );

  it("renders the DeleteWord button with the correct aria-label", () => {
    renderComponent();
    expect(
      screen.getByLabelText(/common:button_delete_word/i)
    ).toBeInTheDocument();
  });

  it("calls setOpenModal when the DeleteWord button is clicked", async () => {
    global.confirm = jest.fn(() => true);
    renderComponent();
    const deleteWordButton = screen.getByLabelText(
      /common:button_delete_word/i
    );
    await act(async () => {
      fireEvent.click(deleteWordButton);
    });
    expect(setOpenModal).toHaveBeenCalledTimes(1);
  });
});
