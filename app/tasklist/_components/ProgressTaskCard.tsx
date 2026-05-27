type ProgressTaskCardProps = {
  category: string;
  priority: string;
  dueLabel: string;
  title: string;
  progressLabel: string;
  progressValue: number;
  categoryClassName: string;
  priorityClassName: string;
  checked?: boolean;
  onToggle?: () => void;
};

export default function ProgressTaskCard({
  category,
  priority,
  dueLabel,
  title,
  progressLabel,
  progressValue,
  categoryClassName,
  priorityClassName,
  checked = false,
  onToggle,
}: ProgressTaskCardProps) {
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
            <span className="ml-auto text-[12px] font-semibold text-[#6B7280]">
              {dueLabel}
            </span>
          </div>

          <h3 className="mt-4 text-[#151C27] font-semibold text-[16px]">
            {title}
          </h3>

          <div className="mt-4">
            <div className="w-full h-3 bg-[#D8D0E3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#A78BFA] rounded-full"
                style={{
                  width: `${Math.min(Math.max(progressValue, 0), 100)}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-[12px] text-[#6B7280]">
              <span>{progressLabel}</span>
              <span className="text-[#111827] font-semibold">
                {progressValue}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
