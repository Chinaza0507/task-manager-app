export default function FocusGoalCard() {
  return (
    <div className="bg-[#6D4BC1] rounded-2xl shadow-sm px-6 py-8 text-white">
      <div className="text-[14px] font-semibold tracking-wide">FOCUS GOAL</div>
      <div className="mt-6 text-[52px] font-bold leading-none">
        4.5<span className="text-[28px] font-semibold">/ 6h</span>
      </div>
      <p className="mt-4 text-[14px] text-white/80">
        You’re 75% through your daily focus goal. Keep it up!
      </p>
      <button className="mt-10 w-full bg-white text-[#151C27] font-semibold py-4 rounded-xl shadow-sm">
        Start Session
      </button>
    </div>
  );
}
