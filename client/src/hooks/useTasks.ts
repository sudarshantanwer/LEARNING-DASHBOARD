import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateTaskInput, UpdateTaskInput } from "../types";
import { dashboardApi, tasksApi } from "../services/api";

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => ["tasks", id] as const
};

export const dashboardKeys = {
  summary: ["dashboard"] as const
};

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.summary,
    queryFn: () => dashboardApi.get()
  });
}

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: () => tasksApi.list()
  });
}

export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: id ? taskKeys.detail(id) : ["tasks", "none"],
    queryFn: () => tasksApi.get(id as string),
    enabled: Boolean(id)
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksApi.create(input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: taskKeys.all });
      void qc.invalidateQueries({ queryKey: dashboardKeys.summary });
    }
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) => tasksApi.update(id, input),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: taskKeys.all });
      void qc.invalidateQueries({ queryKey: taskKeys.detail(vars.id) });
      void qc.invalidateQueries({ queryKey: dashboardKeys.summary });
    }
  });
}

export function usePatchTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UpdateTaskInput["status"] }) =>
      tasksApi.patchStatus(id, status!),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: taskKeys.all });
      void qc.invalidateQueries({ queryKey: taskKeys.detail(vars.id) });
      void qc.invalidateQueries({ queryKey: dashboardKeys.summary });
    }
  });
}
