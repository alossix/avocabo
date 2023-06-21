import { mockUser, mockVocabEntry } from "@/lib/testUtils";
import { store } from "@/store/store";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { VocabCard } from "./VocabCard";

describe("VocabCard", () => {
  const renderVocabCard = () => {
    return render(
      <Provider store={store}>
        <VocabCard currentUser={mockUser} vocabWord={mockVocabEntry} />
      </Provider>
    );
  };

  test("renders the card with initial values", () => {
    renderVocabCard();

    expect(screen.getByText(/vocab:vocab_due_date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /vocab:vocab_edit_entry_title/i })
    ).toBeInTheDocument();
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
