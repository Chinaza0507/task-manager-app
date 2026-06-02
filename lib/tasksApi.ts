export type BackendTask = {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
};

const DEFAULT_API_BASE_URL = "http://localhost:3001";

function getApiBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!envUrl) return DEFAULT_API_BASE_URL;
  return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // Ignore JSON parse errors and keep fallback message.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function listTasks() {
  return request<BackendTask[]>("/tasks", { method: "GET" });
}

export function createTask(payload: { title: string; description?: string }) {
  return request<BackendTask>("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTaskCompletion(id: number, isCompleted: boolean) {
  return request<string>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ is_completed: isCompleted }),
  });
}

export function deleteTaskById(id: number) {
  return request<string>(`/tasks/${id}`, {
    method: "DELETE",
  });
}
