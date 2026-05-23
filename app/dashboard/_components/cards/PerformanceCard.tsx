type PerformanceCardProps = {
  percent?: number;
  focusText?: string;
  tasksText?: string;
  streakText?: string;
};

export default function PerformanceCard({
  percent = 75,
  focusText = "2h 15m",
  tasksText = "4",
  streakText = "6d",
}: PerformanceCardProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-[#151C27] font-bold text-[18px]">Performance</h2>
      </div>

      <div className="px-6 pb-6">
        <p className="text-[#6B7280] text-[13px] mb-4">
          Gentle analytics that celebrate consistency.
        </p>

        <div className="w-full">
          <div className="w-full h-3 bg-[#E9DEF5] rounded-full overflow-hidden">
            <div
              className="bg-[#7C3AED] h-full rounded-full"
              style={{ width: `${clamped}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] text-[#6B7280] font-normal mt-3">
            <span>Progress</span>
            <span className="font-semibold text-[#151C27]">{clamped}%</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="bg-white border border-[#E7E1F2] rounded-xl px-3 py-3">
            <div className="text-[#6B7280] text-[12px]">Focus</div>
            <div className="text-[#151C27] font-bold">{focusText}</div>
          </div>
          <div className="bg-white border border-[#E7E1F2] rounded-xl px-3 py-3">
            <div className="text-[#6B7280] text-[12px]">Tasks</div>
            <div className="text-[#151C27] font-bold">{tasksText}</div>
          </div>
          <div className="bg-white border border-[#E7E1F2] rounded-xl px-3 py-3">
            <div className="text-[#6B7280] text-[12px]">Streak 🔥</div>
            <div className="text-[#151C27] font-bold">{streakText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
