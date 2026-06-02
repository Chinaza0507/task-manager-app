import { NextResponse } from "next/server";

function getBackendBaseUrl() {
  const base = process.env.TASK_API_BASE_URL;
  if (!base) {
    throw new Error(
      "TASK_API_BASE_URL is not set. Example: TASK_API_BASE_URL=http://localhost:3000",
    );
  }

  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const payload = await request.json();

    const response = await fetch(`${getBackendBaseUrl()}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const bodyText = await response.text();

    return new NextResponse(bodyText, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update task";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const response = await fetch(`${getBackendBaseUrl()}/tasks/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const bodyText = await response.text();

    return new NextResponse(bodyText, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete task";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
