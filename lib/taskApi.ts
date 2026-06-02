export type BackendTask = {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
};

type CreateTaskPayload = {
  title: string;
  description?: string;
};

async function parseJsonOrThrow<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      (data &&
        typeof data === "object" &&
        "error" in data &&
        typeof data.error === "string" &&
        data.error) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function listTasks() {
  const response = await fetch("http://localhost:3001/api/tasks", {
    method: "GET",
    cache: "no-store",
  });

  return parseJsonOrThrow<BackendTask[]>(response);
}

export async function createTask(payload: CreateTaskPayload) {
  const response = await fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseJsonOrThrow<BackendTask>(response);
}

export async function updateTaskCompletion(id: number, isCompleted: boolean) {
  const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed: isCompleted }),
  });

  return parseJsonOrThrow<unknown>(response);
}
