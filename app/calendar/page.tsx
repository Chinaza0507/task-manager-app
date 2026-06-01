"use client";

import { useMemo, useState } from "react";
import CalendarGrid from "./_component/CalendarGrid";
import TaskBriefing from "./_component/TaskBriefing";

type CategoryKey = "study" | "lecture" | "deadline" | "meeting";

type CalendarEvent = {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  category: CategoryKey;
};

const CATEGORY_STYLES: Record<
  CategoryKey,
  { accent: string; marker: string; label: string }
> = {
  study: {
    label: "Study session",
    accent: "border-[#15803D] bg-[#F1FAEA]",
    marker: "bg-[#22C55E]",
  },
  lecture: {
    label: "Lecture",
    accent: "border-[#7E22CE] bg-[#F4D9F5]",
    marker: "bg-[#A855F7]",
  },
  deadline: {
    label: "Deadline",
    accent: "border-[#EF4444] bg-[#F0C8CF]",
    marker: "bg-[#EF4444]",
  },
  meeting: {
    label: "Meeting",
    accent: "border-[#15803D] bg-[#F1FAEA]",
    marker: "bg-[#16A34A]",
  },
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
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const date = toIsoDate(today);
    return [
      {
        id: "seed-1",
        date,
        time: "15:00 – 16:30",
        title: "Study Session: Mathematical methods II",
        location: "Library",
        category: "study",
      },
      {
        id: "seed-2",
        date,
        time: "12:30 – 14:30",
        title: "Computer security fundamentals lecture",
        location: "Room 2",
        category: "lecture",
      },
      {
        id: "seed-3",
        date,
        time: "11:00 DEADLINE!",
        title: "Linear algebra assignment",
        location: "Submission via student portal",
        category: "deadline",
      },
      {
        id: "seed-4",
        date,
        time: "17:00 – 18:00",
        title: "CSC 202 Group meeting",
        location: "Engineering and Drawing Studio",
        category: "meeting",
      },
    ];
  });

  const selectedIso = toIsoDate(selectedDate);
  const selectedTasks = events
    .filter((event) => event.date === selectedIso)
    .map((event) => ({
      ...event,
      accent: CATEGORY_STYLES[event.category].accent,
    }));

  const calendarMarkers = events.map((event) => ({
    id: event.id,
    date: event.date,
    marker: CATEGORY_STYLES[event.category].marker,
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
