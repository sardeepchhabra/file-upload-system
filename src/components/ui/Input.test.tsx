import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
  test("renders input element with default attributes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveClass("border", "rounded-md", "w-full");
  });

  test("renders with provided type", () => {
    render(<Input type="password" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  test("renders with placeholder text", () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");
    expect(input).toBeInTheDocument();
  });

  test("merges additional className properly", () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input");
  });

  test("supports disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("supports aria-invalid attribute for invalid inputs", () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("passes through additional props correctly", () => {
    render(<Input data-testid="input-field" id="user-input" />);
    const input = screen.getByTestId("input-field");
    expect(input).toHaveAttribute("id", "user-input");
  });
});
