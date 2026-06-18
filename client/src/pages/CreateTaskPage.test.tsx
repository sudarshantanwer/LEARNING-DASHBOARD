import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateTaskPage } from "./CreateTaskPage";

function renderCreate() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={["/tasks/new"]}>
        <Routes>
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<div />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("CreateTaskPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("creates a task and navigates", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      const url = String(input);
      if (url.endsWith("/api/users")) {
        return new Response(JSON.stringify([{ id: "u1", name: "Owner", email: "o@e.com", role: "Eng" }]), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.endsWith("/api/tasks") && init?.method === "POST") {
        return new Response(
          JSON.stringify({
            id: "new-1",
            title: "Hello",
            description: "",
            category: "General",
            priority: "HIGH",
            status: "TODO",
            ownerId: "u1",
            dueDate: "2030-01-01T00:00:00.000Z",
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z"
          }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("not found", { status: 404 });
    });

    renderCreate();

    await waitFor(() => expect(screen.getByLabelText(/title/i)).toBeInTheDocument());

    await userEvent.type(screen.getByLabelText(/^title/i), "Hello");
    await userEvent.selectOptions(screen.getByLabelText(/^priority/i), "HIGH");
    await userEvent.selectOptions(screen.getByLabelText(/^owner/i), "u1");
    await userEvent.type(screen.getByLabelText(/^due date/i), "2030-01-01T10:00");

    await userEvent.click(screen.getByRole("button", { name: /create task/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });
});
