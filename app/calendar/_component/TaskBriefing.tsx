type CalendarEvent = {
  id: string;
  time: string;
  title: string;
  location: string;
  accent: string;
};

type TaskBriefingProps = {
  dateLabel: string;
  tasks: CalendarEvent[];
};

export default function TaskBriefing({ dateLabel, tasks }: TaskBriefingProps) {
  return (
    <div className="bg-[#EDE4F6] border border-[#D8CFE9] rounded-[32px] shadow-[0_10px_25px_rgba(17,24,39,0.15)] p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-bold text-[#151C27]">Task briefing</h3>
        <span className="rounded-xl bg-[#D5C4F4] text-[#7C3AED] font-semibold text-[14px] px-4 py-1">
          {dateLabel}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#CFC6DF] px-4 py-6 text-center text-[14px] text-[#6B7280]">
            No tasks scheduled for this day.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-2xl border-l-[6px] p-4 ${task.accent}`}
            >
              <div className="text-[13px] font-semibold text-[#111827]">
                {task.time}
              </div>
              <div className="text-[15px] font-bold text-[#111827] mt-1">
                {task.title}
              </div>
              <div className="text-[13px] text-[#4B5563] mt-1">
                {task.location}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
