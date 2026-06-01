type FilterChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function FilterChip({
  label,
  active,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-[13px] font-semibold transition-colors ${
        active
          ? "bg-[#A78BFA] border-[#A78BFA] text-[#1F1B2C]"
          : "bg-white border-[#E7E1F2] text-[#111827] hover:bg-[#F4EFFB]"
      }`}
    >
      {label}
    </button>
  );
}
