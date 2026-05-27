import { Clock, MessageSquare, Paperclip } from "lucide-react";

type TaskListCardProps = {
  category: string;
  priority: string;
  dueLabel: string;
  title: string;
  description: string;
  files: number;
  comments: number;
  categoryClassName: string;
  priorityClassName: string;
  dueClassName?: string;
  checked?: boolean;
  onToggle?: () => void;
};

export default function TaskListCard({
  category,
  priority,
  dueLabel,
  title,
  description,
  files,
  comments,
  categoryClassName,
  priorityClassName,
  dueClassName = "text-[#DC2626]",
  checked = false,
  onToggle,
}: TaskListCardProps) {
  return (
    <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm px-6 py-5">
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-label="Toggle task"
          onClick={onToggle}
          className={`w-9 h-9 rounded-xl border-2 border-[#3F3A4A] flex items-center justify-center transition-colors ${
            checked ? "bg-[#A78BFA] text-white" : "bg-white"
          }`}
        >
          {checked && "✓"}
        </button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[12px] font-semibold px-3 py-1 rounded-full ${categoryClassName}`}
            >
              {category}
            </span>
            <span
              className={`text-[12px] font-semibold px-3 py-1 rounded-full ${priorityClassName}`}
            >
              {priority}
            </span>
            <span
              className={`ml-auto inline-flex items-center gap-1 text-[12px] font-semibold ${dueClassName}`}
            >
              <Clock size={14} />
              {dueLabel}
            </span>
          </div>

          <h3 className="mt-4 text-[#151C27] font-semibold text-[16px]">
            {title}
          </h3>
          <p className="text-[#6B7280] text-[14px] mt-2">{description}</p>

          <div className="mt-4 flex items-center gap-6 text-[#6B7280] text-[13px]">
            <span className="inline-flex items-center gap-2">
              <Paperclip size={14} />
              {files} Files
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageSquare size={14} />
              {comments} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
