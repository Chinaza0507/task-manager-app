"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
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
  category: string;
  priority: "High" | "Medium" | "Low";
  dueLabel: string;
  dueSoon?: boolean;
  files?: number;
  comments?: number;
  progressLabel?: string;
  progressValue?: number;
  completed?: boolean;
};

type StoredTask = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed?: boolean;
};

const STORAGE_KEY = "taskpilot.tasks";

const STATIC_FILTERS = ["All Tasks", "High Priority", "Next 48h"];

const CATEGORY_STYLE_POOL = [
  "bg-[#E9D5FF] text-[#6D28D9]",
  "bg-[#FBD4B7] text-[#EA580C]",
  "bg-[#BBF7D0] text-[#15803D]",
  "bg-[#BAE6FD] text-[#0369A1]",
  "bg-[#FDE68A] text-[#B45309]",
  "bg-[#FECDD3] text-[#BE123C]",
];

const PRIORITY_STYLES: Record<Task["priority"], string> = {
  High: "bg-[#FCA5A5] text-[#B91C1C]",
  Medium: "bg-[#FED7AA] text-[#C2410C]",
  Low: "bg-[#BFDBFE] text-[#2563EB]",
};

const INITIAL_TASKS: Task[] = [
  {
    id: "history-essay",
    title: "Renaissance Art Essay Final Draft",
    description:
      "Complete the bibliography and finalize the introduction section with new citations.",
    category: "History",
    priority: "High",
    dueLabel: "Due Today",
    dueSoon: true,
    files: 2,
    comments: 3,
  },
  {
    id: "calc-integration",
    title: "Problem Set: Integration by Parts",
    category: "Mathematics",
    priority: "Medium",
    dueLabel: "Due Oct 24",
    progressLabel: "12 of 18 problems finished",
    progressValue: 65,
  },
  {
    id: "physics-lab",
    title: "Lab Report: Thermodynamics",
    category: "Physics",
    priority: "Low",
    dueLabel: "Completed Yesterday",
    completed: true,
  },
];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function storedTaskToTask(s: StoredTask): Task {
  const due = new Date(s.dueDate);
  const now = new Date();
  const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
  const dueSoon = diffHours >= 0 && diffHours <= 48;
  const overdue = diffHours < 0;

  const dueLabel = s.completed
    ? "Completed"
    : overdue
      ? "Overdue"
      : dueSoon
        ? "Due Soon"
        : `Due ${due.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  return {
    id: s.id,
    title: s.title,
    description: s.description,
    category: s.category,
    priority: s.priority,
    dueLabel,
    dueSoon,
    completed: s.completed ?? false,
  };
}

export default function TaskListPage() {
  const [activeFilter, setActiveFilter] = useState("All Tasks");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: StoredTask[] = stored ? JSON.parse(stored) : [];
    const storedIds = new Set(parsed.map((t) => t.id));

    const missingInitial = INITIAL_TASKS.filter(
      (t) => !storedIds.has(t.id),
    ).map(
      (t): StoredTask => ({
        id: t.id,
        title: t.title,
        description: t.description,
        category: t.category,
        priority: t.priority,
        dueDate: toIsoDate(new Date()),
        completed: t.completed ?? false,
      }),
    );

    if (missingInitial.length > 0) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...missingInitial, ...parsed]),
      );
    }

    const all = [...missingInitial, ...parsed];
    const seen = new Set<string>();
    const deduped = all.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });

    setTasks(deduped.map(storedTaskToTask));
  }, []);

  const categoryStyleMap = useMemo(() => {
    const map: Record<string, string> = {};
    const allCategories = [...new Set(tasks.map((t) => t.category))];
    allCategories.forEach((cat, i) => {
      map[cat] = CATEGORY_STYLE_POOL[i % CATEGORY_STYLE_POOL.length];
    });
    return map;
  }, [tasks]);

  const dynamicCategoryFilters = useMemo(() => {
    return [...new Set(tasks.map((t) => t.category))];
  }, [tasks]);

  const allFilters = [
    ...STATIC_FILTERS.slice(0, 1),
    ...dynamicCategoryFilters,
    ...STATIC_FILTERS.slice(1),
  ];

  const filteredTasks = useMemo(() => {
    if (activeFilter === "All Tasks") return tasks;
    if (activeFilter === "High Priority")
      return tasks.filter((t) => t.priority === "High");
    if (activeFilter === "Next 48h") return tasks.filter((t) => t.dueSoon);
    return tasks.filter((t) => t.category === activeFilter);
  }, [activeFilter, tasks]);

  const openTasks = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const parsed: StoredTask[] = JSON.parse(stored);
    const updated = parsed.filter((t) => t.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E1F2] shadow-sm text-[13px] font-semibold text-[#151C27]">
          <SlidersHorizontal size={14} className="text-[#6B7280]" />
          Filter by:
        </div>

        {allFilters.map((filter) => (
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
          {openTasks.map((task) =>
            task.progressValue !== undefined ? (
              <ProgressTaskCard
                key={task.id}
                checked={false}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                category={task.category}
                priority={task.priority}
                dueLabel={task.dueLabel}
                title={task.title}
                progressLabel={task.progressLabel ?? ""}
                progressValue={task.progressValue}
                categoryClassName={categoryStyleMap[task.category]}
                priorityClassName={PRIORITY_STYLES[task.priority]}
              />
            ) : (
              <TaskListCard
                key={task.id}
                checked={false}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                category={task.category}
                priority={task.priority}
                dueLabel={task.dueLabel}
                title={task.title}
                description={task.description ?? ""}
                files={task.files ?? 0}
                comments={task.comments ?? 0}
                categoryClassName={categoryStyleMap[task.category]}
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
              onDelete={() => deleteTask(task.id)}
              category={task.category}
              priority={task.priority}
              status={task.dueLabel}
              title={task.title}
            />
          ))}
        </div>

        <div className="space-y-6">
          <FocusGoalCard />
          <UpcomingCard />
        </div>
      </div>
    </section>
  );
}
