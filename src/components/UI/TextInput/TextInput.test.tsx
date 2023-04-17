import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "@/components/UI/TextInput";
import { useForm, FormProvider } from "react-hook-form";

const TestWrapper = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>
        <TextInput
          id="test-input"
          labelText="Test Input"
          register={methods.register("testInput")}
        />
      </form>
    </FormProvider>
  );
};

describe("TextInput", () => {
  it("should render the input", () => {
    render(<TestWrapper />);
    const inputElement = screen.getByLabelText("Test Input");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display the correct value", () => {
    render(<TestWrapper />);
    const inputElement = screen.getByLabelText(
      "Test Input"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "test value" } });
    expect(inputElement.value).toBe("test value");
  });
});
