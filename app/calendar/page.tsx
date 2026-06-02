"use client";

import { useEffect, useMemo, useState } from "react";
import CalendarGrid from "./_component/CalendarGrid";
import TaskBriefing from "./_component/TaskBriefing";

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

const TASK_ACCENT = "border-[#7C3AED] bg-[#EDE9FE]";
const TASK_MARKER = "bg-[#7C3AED]";

const PRIORITY_ACCENTS: Record<StoredTask["priority"], string> = {
  High: "border-[#EF4444] bg-[#F0C8CF]",
  Medium: "border-[#F97316] bg-[#FEF3C7]",
  Low: "border-[#15803D] bg-[#F1FAEA]",
};

const PRIORITY_MARKERS: Record<StoredTask["priority"], string> = {
  High: "bg-[#EF4444]",
  Medium: "bg-[#F97316]",
  Low: "bg-[#22C55E]",
};

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatHeading(date: Date) {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function formatChip(date: Date) {
  return date.toLocaleString("en-US", { month: "short", day: "2-digit" });
}

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [storedTasks, setStoredTasks] = useState<StoredTask[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: StoredTask[] = JSON.parse(raw);
    setStoredTasks(parsed);
  }, []);

  const selectedIso = toIsoDate(selectedDate);

  const selectedTasks = storedTasks
    .filter((t) => t.dueDate === selectedIso && !t.completed)
    .map((t) => ({
      id: t.id,
      time: `Due — ${t.priority} priority`,
      title: t.title,
      location: t.category,
      accent: PRIORITY_ACCENTS[t.priority] ?? TASK_ACCENT,
    }));

  const calendarMarkers = storedTasks
    .filter((t) => !t.completed)
    .map((t) => ({
      id: t.id,
      date: t.dueDate,
      marker: PRIORITY_MARKERS[t.priority] ?? TASK_MARKER,
    }));

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    if (
      date.getFullYear() !== currentDate.getFullYear() ||
      date.getMonth() !== currentDate.getMonth()
    ) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  return (
    <section className="py-10">
      <div>
        <div className="text-[18px] font-semibold text-[#151C27]">Calendar</div>
        <p className="text-[#6B7280] mt-1 text-[14px]">
          Organize your academic sessions, deadlines, and study plans in one
          place.
        </p>
      </div>

      <h1 className="text-[34px] font-extrabold text-[#151C27] mt-4">
        {formatHeading(currentDate)}
      </h1>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-10 items-start">
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          events={calendarMarkers}
          onSelectDate={handleSelectDate}
        />

        <TaskBriefing
          dateLabel={formatChip(selectedDate)}
          tasks={selectedTasks}
        />
      </div>
    </section>
  );
}
