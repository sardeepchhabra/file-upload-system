import { render, screen, fireEvent } from "@testing-library/react";
import { PdfUploader } from "./PdfUploader";
import React from "react";

// Mock alert
global.alert = jest.fn();

describe("PdfUploader Component", () => {
  const mockOnFileSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders upload button and description", () => {
    render(
      <PdfUploader onFileSelect={mockOnFileSelect} isProcessing={false} />
    );

    expect(screen.getByText("Upload PDF Document")).toBeInTheDocument();
    expect(screen.getByText("Choose PDF File")).toBeInTheDocument();
    expect(
      screen.getByText("Supported format: PDF (max 10MB)")
    ).toBeInTheDocument();
  });

  test("clicking button triggers file input click", () => {
    render(
      <PdfUploader onFileSelect={mockOnFileSelect} isProcessing={false} />
    );

    const input = screen.getByTestId("file-input") as HTMLInputElement;

    const button = screen.getByRole("button", { name: /choose pdf file/i });
    const inputClickSpy = jest.spyOn(input, "click");

    // Manually expose the input via ref simulation
    Object.defineProperty(input, "click", { value: inputClickSpy });
    button.click();

    expect(inputClickSpy).toHaveBeenCalled();
  });

  test("calls onFileSelect with valid PDF file", () => {
    render(
      <PdfUploader onFileSelect={mockOnFileSelect} isProcessing={false} />
    );

    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });

  test("shows alert for non-PDF file", () => {
    render(
      <PdfUploader onFileSelect={mockOnFileSelect} isProcessing={false} />
    );

    // const input = screen.getByRole("textbox", {
    //   hidden: true,
    // }) as HTMLInputElement;
    const input = screen.getByTestId("file-input") as HTMLInputElement;
    const invalidFile = new File(["dummy"], "image.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [invalidFile] } });

    expect(global.alert).toHaveBeenCalledWith("Please select a valid PDF file");
    expect(mockOnFileSelect).not.toHaveBeenCalled();
  });

  test("disables button and input when processing", () => {
    render(<PdfUploader onFileSelect={mockOnFileSelect} isProcessing={true} />);

    const button = screen.getByRole("button");
    const input = screen.getByTestId("file-input") as HTMLInputElement;

    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
  });

  test("button text changes to 'Processing...' when processing", () => {
    render(<PdfUploader onFileSelect={mockOnFileSelect} isProcessing={true} />);
    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });
});
