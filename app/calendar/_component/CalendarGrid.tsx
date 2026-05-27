type CalendarEvent = {
  id: string;
  date: string;
  marker: string;
};

type CalendarGridProps = {
  currentDate: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
};

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarGrid({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startIndex = (firstOfMonth.getDay() + 6) % 7;

  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = 42;

  const cells = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startIndex + 1;

    if (dayNumber < 1) {
      const date = new Date(year, month - 1, prevMonthDays + dayNumber);
      return { date, muted: true };
    }

    if (dayNumber > daysInMonth) {
      const date = new Date(year, month + 1, dayNumber - daysInMonth);
      return { date, muted: true };
    }

    const date = new Date(year, month, dayNumber);
    return { date, muted: false };
  });

  const today = new Date();

  return (
    <div className="bg-[#EDE4F6] border border-[#D8CFE9] rounded-[32px] shadow-[0_10px_25px_rgba(17,24,39,0.15)] p-8">
      <div className="grid grid-cols-7 gap-4 text-[12px] font-semibold text-[#151C27] tracking-[0.12em]">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-7 gap-4">
        {cells.map(({ date, muted }) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          const dateKey = toIsoDate(date);
          const markers = events
            .filter((event) => event.date === dateKey)
            .slice(0, 3);

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onSelectDate(date)}
              className={cx(
                "h-16 rounded-2xl border border-[#CFC6DF] flex flex-col justify-between p-3 text-[14px] text-left transition-colors",
                isSelected && "bg-[#9E74F3] text-white border-transparent",
                muted && !isSelected && "bg-[#E8E1F1] text-[#6B7280]",
                !muted && !isSelected && "bg-[#B7AEC7] text-[#151C27]",
                isToday && !isSelected && "ring-2 ring-[#8B5CF6]/40",
              )}
            >
              <span className={cx("font-semibold", isSelected && "text-white")}>
                {date.getDate()}
              </span>
              {markers.length > 0 && (
                <div className="flex flex-col gap-1">
                  {markers.map((event) => (
                    <span
                      key={event.id}
                      className={cx("h-[3px] rounded-full", event.marker)}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
