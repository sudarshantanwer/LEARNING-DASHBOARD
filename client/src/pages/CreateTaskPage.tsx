import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { datetimeLocalToIso } from "../utils/datetime";
import { PageHeader } from "../components/PageHeader";
import { TaskForm } from "../components/TaskForm";
import { useCreateTask } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";

export function CreateTaskPage() {
  const users = useUsers();
  const create = useCreateTask();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (users.isLoading) return <LoadingState />;
  if (users.isError || !users.data) {
    return <ErrorState title="Could not load users" message={String(users.error)} onRetry={() => users.refetch()} />;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Create task" subtitle="Required fields: title, priority, owner, and due date." />

      <TaskForm
        mode="create"
        users={users.data}
        submitting={create.isPending}
        error={error}
        onSubmit={async (values) => {
          setError(null);
          if (!values.title) {
            setError("Title is required.");
            return;
          }
          if (!values.ownerId) {
            setError("Owner is required.");
            return;
          }
          if (!values.dueDate) {
            setError("Due date is required.");
            return;
          }
          try {
            const created = await create.mutateAsync({
              title: values.title,
              priority: values.priority,
              ownerId: values.ownerId,
              dueDate: datetimeLocalToIso(values.dueDate),
              description: values.description,
              category: values.category,
              status: values.status
            });
            navigate(`/tasks/${created.id}`);
          } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to create task");
          }
        }}
      />
    </div>
  );
}
