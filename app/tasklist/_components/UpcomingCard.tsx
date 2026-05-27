type UpcomingItem = {
  month: string;
  day: string;
  title: string;
  subtitle: string;
  badgeClassName: string;
};

const items: UpcomingItem[] = [
  {
    month: "OCT",
    day: "25",
    title: "Chem quiz",
    subtitle: "Chapters 4-5 organic",
    badgeClassName: "bg-[#FCA5A5] text-[#B91C1C]",
  },
  {
    month: "OCT",
    day: "28",
    title: "Presentation",
    subtitle: "Group Project: COS",
    badgeClassName: "bg-[#E9D5FF] text-[#6B21A8]",
  },
];

export default function UpcomingCard() {
  return (
    <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm px-6 py-6">
      <h3 className="text-[#151C27] font-bold text-[18px]">Upcoming</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold ${item.badgeClassName}`}
            >
              <div className="text-[12px]">{item.month}</div>
              <div className="text-[20px] leading-none">{item.day}</div>
            </div>
            <div>
              <div className="text-[#151C27] font-semibold">{item.title}</div>
              <div className="text-[#6B7280] text-[13px]">
                {item.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
