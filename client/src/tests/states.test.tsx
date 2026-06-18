import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";

describe("UI states", () => {
  it("renders loading state", () => {
    render(<LoadingState label="Loading tasks…" />);
    expect(screen.getByRole("status")).toHaveTextContent(/loading tasks/i);
  });

  it("renders empty state", () => {
    render(<EmptyState title="Nothing here" description="Add something" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Add something")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const onRetry = vi.fn();
    render(<ErrorState title="Oops" message="boom" onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent(/boom/);
  });
});
