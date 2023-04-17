import { mockVocabEntry } from "@/lib/testUtils";
import { store } from "@/store/store";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { EditVocabModal } from "./EditVocabModal";
import { act } from "react-dom/test-utils";

const setOpenModal = jest.fn();

describe("EditVocabModal", () => {
  const renderComponent = (isOpen: boolean) =>
    render(
      <Provider store={store}>
        <EditVocabModal
          isOpen={isOpen}
          setOpenModal={setOpenModal}
          vocabWord={mockVocabEntry}
        />
      </Provider>
    );

  it("renders the EditVocabModal with the correct aria-label", () => {
    renderComponent(true);
    expect(
      screen.getByLabelText(/vocab:vocab_edit_entry_title/i)
    ).toBeInTheDocument();
  });

  it("renders the definition input field with the correct label", () => {
    renderComponent(true);
    expect(
      screen.getByLabelText(/vocab:vocab_definition/i)
    ).toBeInTheDocument();
  });

  it("renders the description input field with the correct label", () => {
    renderComponent(true);
    expect(
      screen.getByLabelText(/vocab:vocab_description/i)
    ).toBeInTheDocument();
  });

  it("renders the phonetic pronunciation input field with the correct label", () => {
    renderComponent(true);
    expect(
      screen.getByLabelText(/vocab:vocab_phonetic_pronunciation/i)
    ).toBeInTheDocument();
  });

  it("renders the save and close button with the correct label", () => {
    renderComponent(true);
    expect(
      screen.getByLabelText(/vocab:vocab_save_close/i)
    ).toBeInTheDocument();
  });

  it("calls setOpenModal when the save and close button is clicked", async () => {
    renderComponent(true);
    const saveAndCloseButton = screen.getByLabelText(/vocab:vocab_save_close/i);
    await act(async () => {
      fireEvent.click(saveAndCloseButton);
    });
    expect(setOpenModal).toHaveBeenCalledTimes(1);
  });
});
