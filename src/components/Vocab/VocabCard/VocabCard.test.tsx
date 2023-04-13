import { store } from "@/store/store";
import { Vocab } from "@/types/vocab";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import VocabCard from "./VocabCard";

describe("VocabCard", () => {
  const mockVocab: Vocab = {
    vocabId: "abcde-12345-fghij-67890",
    dueDate: "2023-05-01",
    imageURL: "/public/images/sample.jpg",
    definition: "Sample definition",
    phoneticPronunciation: "sæmpl dɪˈfɪnɪʃən",
    description: "A sample vocab card for testing purposes",
    currentBox: 0,
    category: "noun",
    createdAt: "2023-04-13",
    lastUpdatedAt: "2023-04-13",
  };

  const renderVocabCard = () => {
    return render(
      <Provider store={store}>
        <VocabCard vocabWord={mockVocab} />
      </Provider>
    );
  };

  test("renders the card with initial values", () => {
    renderVocabCard();

    expect(screen.getByText(/vocab:vocab_due_date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /vocab_edit_entry_title/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: mockVocab.definition })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockVocab.description as string)
    ).toBeInTheDocument();
  });

  test("shows vocab word details when card is clicked", () => {
    renderVocabCard();

    const cardWrapper = screen.getByRole("button", {
      name: mockVocab.definition,
    });
    fireEvent.click(cardWrapper);

    expect(screen.getByText(mockVocab.definition)).toBeInTheDocument();
    expect(screen.queryByText(/vocab:vocab_reveal_word.../)).toBeNull();
  });

  test("opens and closes edit modal on button click", () => {
    renderVocabCard();

    const editButton = screen.getByRole("button", {
      name: /vocab:vocab_edit_entry_title/i,
    });
    fireEvent.click(editButton);

    const modal = within(screen.getByRole("dialog"));
    expect(
      modal.getByText(/vocab:vocab_edit_entry_title/i)
    ).toBeInTheDocument();

    const closeButton = modal.getByRole("button", { name: /common:close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
