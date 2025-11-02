import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";

// Helper to check class and data-slot
const expectElement = (el: HTMLElement, slot: string) => {
  expect(el).toBeInTheDocument();
  expect(el).toHaveAttribute("data-slot", slot);
};

describe("Card Components", () => {
  test("renders Card with children", () => {
    render(
      <Card>
        <p>Inside Card</p>
      </Card>
    );

    const card = screen.getByText("Inside Card").closest("div");
    expectElement(card!, "card");
    expect(card).toHaveClass("bg-card");
  });

  test("renders CardHeader correctly", () => {
    render(<CardHeader>Header Content</CardHeader>);
    const el = screen.getByText("Header Content");
    expectElement(el, "card-header");
  });

  test("renders CardTitle correctly", () => {
    render(<CardTitle>My Title</CardTitle>);
    const el = screen.getByText("My Title");
    expectElement(el, "card-title");
    expect(el.tagName).toBe("H4");
  });

  test("renders CardDescription correctly", () => {
    render(<CardDescription>Description text</CardDescription>);
    const el = screen.getByText("Description text");
    expectElement(el, "card-description");
    expect(el.tagName).toBe("P");
  });

  test("renders CardAction correctly", () => {
    render(<CardAction>Action here</CardAction>);
    const el = screen.getByText("Action here");
    expectElement(el, "card-action");
  });

  test("renders CardContent correctly", () => {
    render(<CardContent>Some content</CardContent>);
    const el = screen.getByText("Some content");
    expectElement(el, "card-content");
  });

  test("renders CardFooter correctly", () => {
    render(<CardFooter>Footer here</CardFooter>);
    const el = screen.getByText("Footer here");
    expectElement(el, "card-footer");
  });

  test("applies additional className correctly", () => {
    render(<Card className="custom-class">Card Body</Card>);
    const el = screen.getByText("Card Body").closest("div");
    expect(el).toHaveClass("custom-class");
  });
});
