import { render, screen } from "@testing-library/react";
import { MyVocabPageView } from "./MyVocabPageView";
import { Vocab } from "@/types/vocab";
import { mockUser, mockVocabList } from "@/lib/testUtils";
import { useVocab } from "@/hooks/useVocab";
import { Provider } from "react-redux";
import { store } from "@/store/store";

jest.mock("@/hooks/useVocab");

const mockedUseVocab = useVocab as jest.MockedFunction<typeof useVocab>;

const dueVocabList: Record<string, Vocab> = {};
for (const [vocabId, vocab] of Object.entries(mockVocabList)) {
  if (new Date(vocab.dueDate) < new Date()) {
    dueVocabList[vocabId] = vocab;
  }
}

describe("MyVocabPageView", () => {
  beforeEach(() => {
    // Set up the mock implementation of useVocab
    mockedUseVocab.mockReturnValue({
      addVocabEntry: jest.fn(),
      changeVocabBox: jest.fn(),
      getVocab: jest.fn(),
      removeVocabEntry: jest.fn(),
      setNextVocabEntriesDueToday: jest.fn(),
      updateVocabEntry: jest.fn(),
      vocabListDueToday: dueVocabList,
    });
  });

  afterEach(() => {
    // Clear the mock implementation after each test
    mockedUseVocab.mockClear();
  });

  it("should render the vocab list title", () => {
    render(
      <Provider store={store}>
        <MyVocabPageView currentUser={mockUser} vocabList={mockVocabList} />
      </Provider>
    );
    expect(screen.getByText(/vocab:vocab_list_title/i)).toBeInTheDocument();
  });

  it("should render the message for adding words when no vocab items are due", () => {
    const notDueVocabList: Record<string, Vocab> = Object.fromEntries(
      Object.entries(mockVocabList).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, vocab]) => new Date(vocab.dueDate) > new Date()
      )
    );

    mockedUseVocab.mockReturnValue({
      addVocabEntry: jest.fn(),
      changeVocabBox: jest.fn(),
      getVocab: jest.fn(),
      removeVocabEntry: jest.fn(),
      setNextVocabEntriesDueToday: jest.fn(),
      updateVocabEntry: jest.fn(),
      vocabListDueToday: {},
    });

    render(
      <Provider store={store}>
        <MyVocabPageView currentUser={mockUser} vocabList={notDueVocabList} />
      </Provider>
    );

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "h3" &&
          content.includes("vocab:vocab_no_words")
        );
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/vocab:vocab_no_words_add/i)).toBeInTheDocument();
  });
});
