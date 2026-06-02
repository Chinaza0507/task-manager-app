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

export async function GET() {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/tasks`, {
      method: "GET",
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
      error instanceof Error ? error.message : "Failed to fetch tasks";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(`${getBackendBaseUrl()}/tasks`, {
      method: "POST",
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
      error instanceof Error ? error.message : "Failed to create task";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
