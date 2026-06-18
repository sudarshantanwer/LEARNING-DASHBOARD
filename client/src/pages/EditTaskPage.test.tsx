import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EditTaskPage } from "./EditTaskPage";

function renderEdit(id: string) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[`/tasks/${id}/edit`]}>
        <Routes>
          <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          <Route path="/tasks/:id" element={<div />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("EditTaskPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("loads and submits updates", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      const url = String(input);
      if (url.endsWith("/api/tasks/t1")) {
        if ((init as RequestInit | undefined)?.method === "PUT") {
          return new Response(
            JSON.stringify({
              id: "t1",
              title: "New",
              description: "d",
              category: "General",
              priority: "LOW",
              status: "TODO",
              ownerId: "u1",
              dueDate: "2030-01-01T00:00:00.000Z",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-02T00:00:00.000Z"
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        return new Response(
          JSON.stringify({
            id: "t1",
            title: "Old",
            description: "d",
            category: "General",
            priority: "LOW",
            status: "TODO",
            ownerId: "u1",
            dueDate: "2030-01-01T00:00:00.000Z",
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z"
          }),
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

    renderEdit("t1");

    await waitFor(() => expect(screen.getByDisplayValue("Old")).toBeInTheDocument());

    await userEvent.clear(screen.getByLabelText(/^title/i));
    await userEvent.type(screen.getByLabelText(/^title/i), "New");

    await userEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      const puts = vi.mocked(fetch).mock.calls.filter(
        (c) => String(c[0]).endsWith("/api/tasks/t1") && (c[1] as RequestInit | undefined)?.method === "PUT"
      );
      expect(puts.length).toBeGreaterThan(0);
    });
  });
});
