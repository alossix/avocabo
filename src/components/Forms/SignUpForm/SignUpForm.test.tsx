import { store } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { SignUpForm } from "./SignUpForm";

const setErrorMessageText = jest.fn();
const setShowErrorMessage = jest.fn();

describe("SignUpForm", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SignUpForm
          setErrorMessageText={setErrorMessageText}
          setShowErrorMessage={setShowErrorMessage}
        />
      </Provider>
    );

  it("renders the SignUpForm component", () => {
    renderComponent();
    expect(screen.getByText(/common:sign_up/i)).toBeInTheDocument();
  });
});
