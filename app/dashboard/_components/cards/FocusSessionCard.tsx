type FocusSessionCardProps = {
  timeText?: string;
  remainingText?: string;
  progressPercent?: number; // 0..100
};

function PomodoroIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12a8 8 0 1 1-2.35-5.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4v5h-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v4l2.5 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FocusSessionCard({
  timeText = "25:00",
  remainingText = "Remaining today: 2h 15m",
  progressPercent = 55,
}: FocusSessionCardProps) {
  const clamped = Math.max(0, Math.min(100, progressPercent));

  return (
    <div className="bg-[#6D28D9] rounded-2xl shadow-md text-white overflow-hidden">
      <div className="p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-bold text-[20px]">Focus Session</h2>
            <p className="text-white/80 mt-2">
              Stay sharp, Zoe. You’re doing great!
            </p>
          </div>
          <div className="text-white/70">
            <PomodoroIcon />
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="text-[56px] font-extrabold tracking-tight">
            {timeText}
          </div>
          <div className="text-white/70 mt-2 text-[14px]">{remainingText}</div>
        </div>

        <div className="mt-6">
          <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full"
              style={{ width: `${clamped}%` }}
            />
          </div>
          <button className="mt-5 w-full h-11 rounded-xl bg-white text-[#151C27] font-semibold hover:opacity-95">
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
