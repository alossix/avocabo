import { render, screen } from "@testing-library/react";
import { MyVocabPageView } from "./MyVocabPageView";
import { Vocab } from "@/types/vocab";
import { mockVocabList } from "@/lib/testUtils";
import { useVocab } from "@/hooks/useVocab";
import { Provider } from "react-redux";
import { store } from "@/store/store";

jest.mock("@/hooks/useVocab");

const mockedUseVocab = useVocab as jest.MockedFunction<typeof useVocab>;

const dueVocabList: Vocab[] = mockVocabList.filter(
  (vocab) => new Date(vocab.dueDate) < new Date()
);

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
        <MyVocabPageView vocabList={mockVocabList} />
      </Provider>
    );
    expect(screen.getByText(/vocab:vocab_list_title/i)).toBeInTheDocument();
  });

  it("should render the button for loading next vocab entries when no vocab items are due", () => {
    const noDueVocabList = mockVocabList.filter(
      (vocab) => new Date(vocab.dueDate) > new Date()
    );

    mockedUseVocab.mockReturnValue({
      ...mockedUseVocab(),
      vocabListDueToday: [],
    });

    render(
      <Provider store={store}>
        <MyVocabPageView vocabList={noDueVocabList} />
      </Provider>
    );

    expect(
      screen.getByText(/vocab:vocab_load_next_entries/i)
    ).toBeInTheDocument();
  });
});
