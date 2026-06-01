"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type StoredTask = {
  id: string;
  title: string;
  description?: string;
  category: "Mathematics" | "History" | "Physics";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  completed?: boolean;
};

const STORAGE_KEY = "taskpilot.tasks";

export default function AddTaskPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Mathematics");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = title.trim().length > 0 && dueDate.length > 0;

  const handleTaskSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage(
        "Please fill out both the Task Title and choose a Due Date.",
      );
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const existing: StoredTask[] = stored ? JSON.parse(stored) : [];

      const newTask: StoredTask = {
        id: `task-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        category: category as StoredTask["category"],
        priority: priority as StoredTask["priority"],
        dueDate,
        completed: false,
      };

      const updated = [newTask, ...existing];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      alert("Task created successfully!");
      router.push("/tasklist");
      router.refresh();
    } catch (error: any) {
      console.error("Submission Failure:", error);
      setErrorMessage(error.message || "Something went wrong while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 max-w-3xl px-4 mx-auto">
      <div className="flex items-center gap-3 text-[14px]">
        <Link
          href="/tasklist"
          className="text-[#7C3AED] font-semibold hover:underline"
        >
          ← Back to Task List
        </Link>
      </div>

      <div className="mt-6">
        <h1 className="text-[28px] font-bold text-[#151C27]">Add Task</h1>
        <p className="text-[#6B7280] mt-2">
          Create a new task to stay on track.
        </p>
      </div>

      <form onSubmit={handleTaskSubmission} className="mt-8 space-y-6">
        {errorMessage && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium text-sm">
            ⚠️ {errorMessage}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-[14px] font-semibold text-[#151C27]"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Complete lab report"
            className="mt-2 w-full rounded-xl border border-[#E7E1F2] bg-white px-4 py-3 text-[14px] text-[#111827] shadow-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-[14px] font-semibold text-[#151C27]"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details or notes..."
            className="mt-2 w-full rounded-xl border border-[#E7E1F2] bg-white px-4 py-3 text-[14px] text-[#111827] shadow-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-[14px] font-semibold text-[#151C27]"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E7E1F2] bg-white px-4 py-3 text-[14px] text-[#111827] shadow-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-[14px] font-semibold text-[#151C27]"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E7E1F2] bg-white px-4 py-3 text-[14px] text-[#111827] shadow-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-[14px] font-semibold text-[#151C27]"
          >
            Due date <span className="text-red-500">*</span>
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[#E7E1F2] bg-white px-4 py-3 text-[14px] text-[#111827] shadow-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="rounded-xl bg-[#7C3AED] text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Task"}
          </button>
          <Link
            href="/tasklist"
            className="text-[#6B7280] font-semibold hover:text-[#111827]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
