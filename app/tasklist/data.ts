export type Task = {
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

export const CATEGORY_STYLES: Record<Task["category"], string> = {
  Mathematics: "bg-[#E9D5FF] text-[#6D28D9]",
  History: "bg-[#FBD4B7] text-[#EA580C]",
  Physics: "text-[#22C55E]",
};

export const PRIORITY_STYLES: Record<Task["priority"], string> = {
  High: "bg-[#FCA5A5] text-[#B91C1C]",
  Medium: "bg-[#FED7AA] text-[#C2410C]",
  Low: "text-[#2563EB]",
};

export const TASKS: Task[] = [
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
