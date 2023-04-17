import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/UI/Modal";

describe("Modal", () => {
  it("should not render the modal when isOpen is false", () => {
    const toggleOpen = jest.fn();

    render(
      <Modal isOpen={false} toggleOpen={toggleOpen} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("should render the modal when isOpen is true", () => {
    const toggleOpen = jest.fn();

    render(
      <Modal isOpen={true} toggleOpen={toggleOpen} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("should close the modal when clicking on the backdrop", () => {
    const toggleOpen = jest.fn();

    render(
      <Modal isOpen={true} toggleOpen={toggleOpen} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText("Test Modal"));
    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });

  it("should close the modal when clicking on the close button", () => {
    const toggleOpen = jest.fn();

    render(
      <Modal isOpen={true} toggleOpen={toggleOpen} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });

  it("should close the modal when pressing the Escape key", () => {
    const toggleOpen = jest.fn();

    render(
      <Modal isOpen={true} toggleOpen={toggleOpen} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });
});
