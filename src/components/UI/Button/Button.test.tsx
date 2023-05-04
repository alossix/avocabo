import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/UI/Button";

describe("Button", () => {
  it("should render the button with the given title", () => {
    render(
      <Button title="Test Button" ariaLabel="Test Button">
        Test Button
      </Button>
    );

    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("should call the onClick handler when the button is clicked", () => {
    const onClick = jest.fn();

    render(
      <Button title="Test Button" ariaLabel="Test Button" onClick={onClick}>
        Test Button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClick handler when the button is disabled", () => {
    const onClick = jest.fn();

    render(
      <Button
        title="Test Button"
        ariaLabel="Test Button"
        onClick={onClick}
        disabled={true}
      >
        Test Button
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("should render the button with the specified color set", () => {
    render(
      <Button title="Test Button" ariaLabel="Test Button" colorSet="black">
        Test Button
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background: rgb(32, 32, 32)");
  });

  it("should call the onKeyDown handler when a key is pressed on the button", () => {
    const onKeyDown = jest.fn();

    render(
      <Button title="Test Button" ariaLabel="Test Button" onKeyDown={onKeyDown}>
        Test Button
      </Button>
    );

    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
