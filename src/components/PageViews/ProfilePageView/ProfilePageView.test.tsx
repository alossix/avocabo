import { mockVocabList } from "@/lib/testUtils";
import { useAppSelector } from "@/store/hooks";
import { RootState, store } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ProfilePageView } from "./ProfilePageView";

jest.mock("@/store/hooks");

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
  typeof useAppSelector
>;

const initialState: RootState = {
  auth: {
    user: {
      email: "test@example.com",
      emailVerified: true,
      displayName: "MyName",
      uid: "12345-abcde-67890-fghij",
      interfaceLanguage: "en",
      learningLanguage: "ca",
      userCreatedDate: new Date("2023-01-01"),
      userLastSignIn: new Date("2023-01-15"),
    },
    loading: false,
    error: "",
  },
  interfaceLanguage: {
    interfaceLanguage: "en",
  },
  vocab: mockVocabList,
};

describe("ProfilePageView", () => {
  beforeEach(() => {
    store.dispatch({ type: "SET_INITIAL_STATE", payload: initialState });

    // Mock the useAppSelector to return the initial state
    mockedUseAppSelector.mockImplementation((selector) =>
      selector(initialState)
    );
  });

  afterEach(() => {
    // Clear the mock implementation after each test
    mockedUseAppSelector.mockClear();
  });

  it("should render the correct number of vocab items", () => {
    render(
      <Provider store={store}>
        <ProfilePageView vocabList={mockVocabList} />
      </Provider>
    );

    const vocabItems = screen.getAllByText(/(chair|desk|door)/);
    expect(vocabItems.length).toBe(mockVocabList.length);
  });

  it("should render the total number of vocab items", () => {
    render(
      <Provider store={store}>
        <ProfilePageView vocabList={mockVocabList} />
      </Provider>
    );

    expect(
      screen.getByText(mockVocabList.length.toString())
    ).toBeInTheDocument();
  });

  it("should render the user's email", () => {
    render(<ProfilePageView vocabList={mockVocabList} />);
    if (initialState.auth.user) {
      expect(
        screen.getByText(initialState.auth.user.email as string)
      ).toBeInTheDocument();
    }
  });
});
