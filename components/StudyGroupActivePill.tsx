type StudyGroupActivePillProps = {
  label?: string;
  extraCount?: number;
};

function StudyGroupIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="#93C5FD"
        stroke="#111827"
        strokeWidth="1.5"
      />
      <path
        d="M16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="#86EFAC"
        stroke="#111827"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 20a5.5 5.5 0 0 1 9 0"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.5 20a5.5 5.5 0 0 1 9 0"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StudyGroupActivePill({
  label = "Study group active",
  extraCount = 3,
}: StudyGroupActivePillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E7E1F2] shadow-sm">
      <div className="flex items-center">
        <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E9E4FF] border border-[#D9D1EA]">
          <StudyGroupIcon />
          <span className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[#E9E4FF] border-2 border-white flex items-center justify-center text-[#111827] text-[12px] font-bold">
            +{extraCount}
          </span>
        </span>
      </div>
      <span className="text-[#151C27] font-semibold text-[14px]">{label}</span>
    </div>
  );
}
