import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TaskListPage } from "./TaskListPage";

function renderList() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/tasks"]}>
        <Routes>
          <Route path="/tasks" element={<TaskListPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("TaskListPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("supports search and status filtering", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = String(input);
      if (url.endsWith("/api/tasks")) {
        return new Response(
          JSON.stringify([
            {
              id: "t1",
              title: "Alpha learning",
              description: "notes",
              category: "Learning",
              priority: "LOW",
              status: "TODO",
              ownerId: "u1",
              dueDate: "2030-01-01T00:00:00.000Z",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z"
            },
            {
              id: "t2",
              title: "Beta project",
              description: "x",
              category: "Project",
              priority: "MEDIUM",
              status: "COMPLETED",
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

    renderList();

    await waitFor(() => expect(screen.getByText("Alpha learning")).toBeInTheDocument());
    expect(screen.getByText("Beta project")).toBeInTheDocument();

    await userEvent.type(screen.getByRole("searchbox"), "Beta");
    expect(screen.queryByText("Alpha learning")).not.toBeInTheDocument();
    expect(screen.getByText("Beta project")).toBeInTheDocument();

    await userEvent.clear(screen.getByRole("searchbox"));
    await userEvent.selectOptions(screen.getByLabelText(/status/i), "COMPLETED");
    expect(screen.queryByText("Alpha learning")).not.toBeInTheDocument();
    expect(screen.getByText("Beta project")).toBeInTheDocument();
  });
});
