import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { datetimeLocalToIso } from "../utils/datetime";
import { PageHeader } from "../components/PageHeader";
import { TaskForm } from "../components/TaskForm";
import { useTask, useUpdateTask } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";

export function EditTaskPage() {
  const { id } = useParams();
  const taskQuery = useTask(id);
  const users = useUsers();
  const update = useUpdateTask();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (!id) return <ErrorState title="Missing task id" />;

  if (taskQuery.isLoading || users.isLoading) return <LoadingState />;

  if (taskQuery.isError || !taskQuery.data || users.isError || !users.data) {
    return (
      <ErrorState
        title="Could not load editor"
        message={String(taskQuery.error ?? users.error)}
        onRetry={() => {
          void taskQuery.refetch();
          void users.refetch();
        }}
      />
    );
  }

  const t = taskQuery.data;

  return (
    <div className="space-y-8">
      <PageHeader title="Edit task" subtitle={`Editing: ${t.title}`} />

      <TaskForm
        mode="edit"
        users={users.data}
        defaultValues={t}
        submitting={update.isPending}
        error={error}
        onSubmit={async (values) => {
          setError(null);
          if (!values.title) {
            setError("Title is required.");
            return;
          }
          try {
            await update.mutateAsync({
              id: t.id,
              input: {
                title: values.title,
                description: values.description,
                category: values.category,
                priority: values.priority,
                status: values.status,
                ownerId: values.ownerId,
                dueDate: datetimeLocalToIso(values.dueDate)
              }
            });
            navigate(`/tasks/${t.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to update task");
          }
        }}
      />
    </div>
  );
}
