import type { CreateTaskInput, DashboardStats, ProjectTask, UpdateTaskInput, User } from "../types";

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    const body = await parseJson<{ message?: string }>(res).catch(() => ({}));
    throw new Error(body.message ?? `Request failed (${res.status})`);
  }
  return parseJson<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const bodyJson = await parseJson<{ message?: string; issues?: unknown }>(res).catch(() => ({}));
    throw new Error(bodyJson.message ?? `Request failed (${res.status})`);
  }
  return parseJson<T>(res);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const bodyJson = await parseJson<{ message?: string }>(res).catch(() => ({}));
    throw new Error(bodyJson.message ?? `Request failed (${res.status})`);
  }
  return parseJson<T>(res);
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const bodyJson = await parseJson<{ message?: string }>(res).catch(() => ({}));
    throw new Error(bodyJson.message ?? `Request failed (${res.status})`);
  }
  return parseJson<T>(res);
}

export const tasksApi = {
  list: () => apiGet<ProjectTask[]>("/api/tasks"),
  get: (id: string) => apiGet<ProjectTask>(`/api/tasks/${id}`),
  create: (input: CreateTaskInput) => apiPost<ProjectTask>("/api/tasks", input),
  update: (id: string, input: UpdateTaskInput) => apiPut<ProjectTask>(`/api/tasks/${id}`, input),
  patchStatus: (id: string, status: ProjectTask["status"]) =>
    apiPatch<ProjectTask>(`/api/tasks/${id}/status`, { status })
};

export const dashboardApi = {
  get: () => apiGet<DashboardStats>("/api/dashboard")
};

export const usersApi = {
  list: () => apiGet<User[]>("/api/users")
};
