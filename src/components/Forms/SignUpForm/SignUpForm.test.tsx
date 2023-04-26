import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );

  it("renders the SignUpForm component", () => {
    renderComponent();
    expect(screen.getByText(/common:sign_up/i)).toBeInTheDocument();
  });

  it("displays required field errors when fields are empty and the form is submitted", async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/common:sign_up/i));

    await waitFor(() => {
      expect(
        screen.getByText(/common:display_name_required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/common:email_required/i)).toBeInTheDocument();
      expect(screen.getByText(/common:password_required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/common:confirm_password_required/i)
      ).toBeInTheDocument();
    });
  });
});
