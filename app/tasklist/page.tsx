"use client";

import { useMemo, useState } from "react";
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

export default function TaskListPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All Tasks");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

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

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
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
        </div>

        <div className="space-y-6">
          <FocusGoalCard />
          <UpcomingCard />
        </div>
      </div>
    </section>
  );
}
