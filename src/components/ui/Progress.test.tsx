import React from "react";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress Component", () => {
  test("renders progress root and indicator", () => {
    render(<Progress value={50} />);
    const root = screen.getByRole("progressbar");
    const indicator = root.querySelector('[data-slot="progress-indicator"]');

    expect(root).toBeInTheDocument();
    expect(indicator).toBeInTheDocument();
  });

  test("has correct data-slot attributes", () => {
    render(<Progress value={25} />);
    const root = screen.getByRole("progressbar");
    const indicator = root.querySelector('[data-slot="progress-indicator"]');

    expect(root).toHaveAttribute("data-slot", "progress");
    expect(indicator).toHaveAttribute("data-slot", "progress-indicator");
  });

  test("applies correct transform based on value", () => {
    render(<Progress value={40} />);
    const root = screen.getByRole("progressbar");
    const indicator = root.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveStyle({ transform: "translateX(-60%)" });
  });

  test("handles missing value (defaults to 0%)", () => {
    render(<Progress />);
    const root = screen.getByRole("progressbar");
    const indicator = root.querySelector('[data-slot="progress-indicator"]');
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" });
  });

  test("merges custom className", () => {
    render(<Progress className="custom-progress" value={70} />);
    const root = screen.getByRole("progressbar");
    expect(root).toHaveClass("custom-progress");
  });

  test("passes through extra props", () => {
    render(<Progress data-testid="custom-progress" value={90} />);
    const root = screen.getByTestId("custom-progress");
    expect(root).toBeInTheDocument();
  });
});
