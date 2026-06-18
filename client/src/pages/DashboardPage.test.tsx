import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { DashboardPage } from "../pages/DashboardPage";

function renderDashboard() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders summary cards from API data", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.endsWith("/api/dashboard")) {
        return new Response(
          JSON.stringify({
            totalItems: 2,
            completedItems: 1,
            inProgressItems: 1,
            overdueItems: 0,
            highPriorityItems: 1
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      if (url.endsWith("/api/tasks")) {
        return new Response(
          JSON.stringify([
            {
              id: "t1",
              title: "A",
              description: "",
              category: "General",
              priority: "LOW",
              status: "TODO",
              ownerId: "u1",
              dueDate: "2030-01-01T00:00:00.000Z",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z"
            }
          ]),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      if (url.endsWith("/api/users")) {
        return new Response(JSON.stringify([{ id: "u1", name: "Owner", email: "o@e.com", role: "Eng" }]), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response("not found", { status: 404 });
    });

    renderDashboard();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Total items")).toBeInTheDocument();
    });

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalled();
  });
});
