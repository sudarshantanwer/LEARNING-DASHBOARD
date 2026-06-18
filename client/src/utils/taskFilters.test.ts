import { describe, expect, it } from "vitest";
import type { ProjectTask } from "../types";
import { matchesSearch, matchesStatus } from "./taskFilters";

const base = (overrides: Partial<ProjectTask>): ProjectTask => ({
  id: "x",
  title: "Hello world",
  description: "desc",
  category: "Learning",
  priority: "MEDIUM",
  status: "TODO",
  ownerId: "u1",
  dueDate: "2030-01-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides
});

describe("taskFilters", () => {
  it("matches search across fields", () => {
    const t = base({});
    expect(matchesSearch(t, "hello")).toBe(true);
    expect(matchesSearch(t, "learn")).toBe(true);
    expect(matchesSearch(t, "zzz")).toBe(false);
  });

  it("matches status filter", () => {
    const t = base({ status: "COMPLETED" });
    expect(matchesStatus(t, "ALL")).toBe(true);
    expect(matchesStatus(t, "COMPLETED")).toBe(true);
    expect(matchesStatus(t, "TODO")).toBe(false);
  });
});
