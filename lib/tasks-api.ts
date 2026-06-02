export type TaskPriority = "High" | "Medium" | "Low";

export type StoredTask = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: TaskPriority;
  dueDate: string;
  completed?: boolean;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  category?: string;
  priority?: TaskPriority;
  dueDate: string;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);
const TASKS_ENDPOINT = `${API_BASE_URL}/tasks`;

function toIsoDate(value: unknown): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  if (typeof value === "string" || value instanceof Date) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }

  return new Date().toISOString().slice(0, 10);
}

function normalizePriority(value: unknown): TaskPriority {
  if (typeof value !== "string") return "Medium";

  const normalized = value.toLowerCase();
  if (normalized === "high") return "High";
  if (normalized === "low") return "Low";
  return "Medium";
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = await parseBody(response);

  if (!response.ok) {
    const errorBody =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : null;

    const message =
      (typeof errorBody?.error === "string" && errorBody.error) ||
      (typeof body === "string" && body) ||
      `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return body as T;
}

function normalizeTask(raw: unknown): StoredTask {
  const data = (raw ?? {}) as Record<string, unknown>;
  const taskList = (data.task_list ?? {}) as Record<string, unknown>;

  const completedValue =
    (data.completed ?? data.is_completed ?? data.status === "done") ||
    data.status === "completed";

  return {
    id: String(data.id ?? data.task_id ?? `task-${Date.now()}`),
    title: String(data.title ?? "Untitled task"),
    description: typeof data.description === "string" ? data.description : "",
    category: String(data.category ?? taskList.title ?? "General"),
    priority: normalizePriority(data.priority),
    dueDate: toIsoDate(
      data.dueDate ?? data.deadline ?? data.start_time ?? data.created_at,
    ),
    completed: Boolean(completedValue),
  };
}

export async function getTasks(): Promise<StoredTask[]> {
  const data = await request<unknown>(TASKS_ENDPOINT, {
    method: "GET",
    cache: "no-store",
  });

  const wrapped = (data ?? {}) as Record<string, unknown>;
  const items = Array.isArray(data)
    ? data
    : Array.isArray(wrapped.tasks)
      ? wrapped.tasks
      : [];

  return items.map(normalizeTask);
}

export async function createTask(input: CreateTaskInput): Promise<StoredTask> {
  const payload = {
    title: input.title,
    description: input.description,
    category: input.category ?? "General",
    priority: input.priority ?? "Medium",
    dueDate: input.dueDate,
    deadline: input.dueDate,
    completed: false,
    is_completed: false,
    status: "pending",
  };

  const data = await request<unknown>(TASKS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return normalizeTask(data ?? payload);
}

export async function deleteTaskById(id: string): Promise<void> {
  await request<unknown>(`${TASKS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}

export async function setTaskCompletion(
  id: string,
  completed: boolean,
): Promise<void> {
  try {
    await request<unknown>(`${TASKS_ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        completed,
        is_completed: completed,
        status: completed ? "done" : "pending",
      }),
    });
    return;
  } catch {
    if (!completed) {
      throw new Error(
        "Unable to mark task as incomplete with current backend route setup.",
      );
    }
  }

  await request<unknown>(`${TASKS_ENDPOINT}/${id}/complete`, {
    method: "PATCH",
  });
}
