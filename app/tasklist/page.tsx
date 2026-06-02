"use client";

import { useEffect, useMemo, useState } from "react";
import {
  listTasks,
  updateTaskCompletion,
  type BackendTask,
} from "@/lib/taskApi";
import StudyGroupActivePill from "@/components/StudyGroupActivePill";
import FilterChip from "./_components/FilterChip";
import TaskListCard from "./_components/TaskListCard";
import ProgressTaskCard from "./_components/ProgressTaskCard";
import CompletedTaskCard from "./_components/CompletedTaskCard";
import FocusGoalCard from "./_components/FocusGoalCard";
import UpcomingCard from "./_components/UpcomingCard";

type Task = {
  id: string;
  title: string;
  description?: string;
  category: "Mathematics" | "History" | "Physics";
  priority: "High" | "Medium" | "Low";
  dueLabel: string;
  dueSoon?: boolean;
  files?: number;
  comments?: number;
  progressLabel?: string;
  progressValue?: number;
  completed?: boolean;
};

function mapBackendTask(task: BackendTask): Task {
  return {
    id: String(task.id),
    title: task.title,
    description: task.description ?? "",
    category: "Mathematics",
    priority: "Medium",
    dueLabel: task.is_completed ? "Completed" : "No due date",
    dueSoon: false,
    completed: task.is_completed,
  };
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

type FilterKey =
  | "All Tasks"
  | "Mathematics"
  | "History"
  | "High Priority"
  | "Next 48h";

const FILTERS: FilterKey[] = [
  "All Tasks",
  "Mathematics",
  "History",
  "High Priority",
  "Next 48h",
];

const CATEGORY_STYLES: Record<Task["category"], string> = {
  Mathematics: "bg-[#E9D5FF] text-[#6D28D9]",
  History: "bg-[#FBD4B7] text-[#EA580C]",
  Physics: "text-[#22C55E]",
};

const PRIORITY_STYLES: Record<Task["priority"], string> = {
  High: "bg-[#FCA5A5] text-[#B91C1C]",
  Medium: "bg-[#FED7AA] text-[#C2410C]",
  Low: "text-[#2563EB]",
};

export default function TaskListPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All Tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const backendTasks = await listTasks();
        if (!isMounted) return;
        setTasks(backendTasks.map(mapBackendTask));
      } catch (error: unknown) {
        if (!isMounted) return;
        setErrorMessage(
          getErrorMessage(error, "Could not load tasks from backend."),
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "Mathematics":
        return tasks.filter((task) => task.category === "Mathematics");
      case "History":
        return tasks.filter((task) => task.category === "History");
      case "High Priority":
        return tasks.filter((task) => task.priority === "High");
      case "Next 48h":
        return tasks.filter((task) => task.dueSoon);
      default:
        return tasks;
    }
  }, [activeFilter, tasks]);

  const openTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const toggleTask = async (id: string) => {
    const current = tasks.find((task) => task.id === id);
    if (!current) return;

    const nextCompleted = !current.completed;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: nextCompleted,
              dueLabel: nextCompleted ? "Completed" : "No due date",
            }
          : task,
      ),
    );

    try {
      await updateTaskCompletion(Number(id), nextCompleted);
    } catch (error: unknown) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: current.completed,
                dueLabel: current.completed ? "Completed" : "No due date",
              }
            : task,
        ),
      );

      setErrorMessage(getErrorMessage(error, "Could not update task status."));
    }
  };

  return (
    <section className="py-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#151C27]">Task List</h1>
          <p className="text-[#6B7280] mt-2">
            Manage your academic journey with calm and focus
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/tasklist/add"
            className="inline-flex items-center justify-center rounded-full bg-[#7C3AED] text-white text-[13px] font-semibold px-5 py-2 hover:opacity-90"
          >
            + Add Task
          </a>
          <StudyGroupActivePill extraCount={3} />
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E1F2] shadow-sm text-[13px] font-semibold text-[#151C27]">
          <span className="inline-flex items-center justify-center w-4 h-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M7 12h10M10 18h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Filter by:
        </div>
        {FILTERS.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          />
        ))}

        <div className="ml-auto flex items-center gap-3">
          <span className="text-[#6B7280] text-[13px] font-semibold">
            Sort by:
          </span>
          <select className="h-11 rounded-xl border border-[#E7E1F2] bg-white px-4 text-[13px] font-semibold text-[#111827] shadow-sm outline-none">
            <option>Deadline</option>
            <option>Priority</option>
            <option>Course</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
        <div className="space-y-6">
          {isLoading ? (
            <div className="rounded-2xl border border-[#E7E1F2] bg-white p-6 text-sm text-[#6B7280]">
              Loading tasks...
            </div>
          ) : openTasks.length === 0 && completedTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D8CFE9] bg-white p-8 text-center text-sm text-[#6B7280]">
              No tasks from backend yet.
            </div>
          ) : (
            <>
              {openTasks.map((task) =>
                task.progressValue !== undefined ? (
                  <ProgressTaskCard
                    key={task.id}
                    checked={false}
                    onToggle={() => toggleTask(task.id)}
                    category={task.category}
                    priority={task.priority}
                    dueLabel={task.dueLabel}
                    title={task.title}
                    progressLabel={task.progressLabel ?? ""}
                    progressValue={task.progressValue}
                    categoryClassName={CATEGORY_STYLES[task.category]}
                    priorityClassName={PRIORITY_STYLES[task.priority]}
                  />
                ) : (
                  <TaskListCard
                    key={task.id}
                    checked={false}
                    onToggle={() => toggleTask(task.id)}
                    category={task.category}
                    priority={task.priority}
                    dueLabel={task.dueLabel}
                    title={task.title}
                    description={task.description ?? ""}
                    files={task.files ?? 0}
                    comments={task.comments ?? 0}
                    categoryClassName={CATEGORY_STYLES[task.category]}
                    priorityClassName={PRIORITY_STYLES[task.priority]}
                    dueClassName={
                      task.dueSoon ? "text-[#DC2626]" : "text-[#6B7280]"
                    }
                  />
                ),
              )}

              {completedTasks.map((task) => (
                <CompletedTaskCard
                  key={task.id}
                  checked
                  onToggle={() => toggleTask(task.id)}
                  category={task.category}
                  priority={task.priority}
                  status={task.dueLabel}
                  title={task.title}
                />
              ))}
            </>
          )}
        </div>

        <div className="space-y-6">
          <FocusGoalCard />
          <UpcomingCard />
        </div>
      </div>
    </section>
  );
}
