import { Check } from "lucide-react";

type CompletedTaskCardProps = {
  category: string;
  priority: string;
  status: string;
  title: string;
  checked?: boolean;
  onToggle?: () => void;
};

export default function CompletedTaskCard({
  category,
  priority,
  status,
  title,
  checked = true,
  onToggle,
}: CompletedTaskCardProps) {
  return (
    <div className="flex items-start gap-4 px-3 py-2">
      <button
        type="button"
        aria-label="Toggle task"
        onClick={onToggle}
        className={`w-9 h-9 rounded-xl border-2 border-[#3F3A4A] flex items-center justify-center transition-colors ${
          checked ? "bg-[#A78BFA] text-white" : "bg-white"
        }`}
      >
        {checked && <Check size={16} strokeWidth={3} />}
      </button>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold">
          <span className="text-[#22C55E]">{category}</span>
          <span className="text-[#2563EB]">{priority}</span>
          <span className="ml-auto text-[#6B7280] font-medium">{status}</span>
        </div>
        <div className="mt-2 text-[#6B7280] line-through">{title}</div>
      </div>
    </div>
  );
}
