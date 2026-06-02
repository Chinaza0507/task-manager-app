import getTimeGreeting from "./_components/getTimeGreeting";
import StudyGroupActivePill from "./_components/StudyGroupActivePill";
import FocusSessionCard from "./_components/cards/FocusSessionCard";
import PerformanceCard from "./_components/cards/PerformanceCard";

export default function DashboardPage() {
  return (
    <section className="py-10">
      <div className="flex items-start justify-between gap-8">
        <div>
          <h1 className="text-[40px] font-extrabold text-[#151C27]">
            {getTimeGreeting(new Date())}, Zoe!
          </h1>
          <p className="text-[#6B7280] mt-2">
            You have 4 tasks to focus on today.
          </p>
        </div>

        <div className="mt-2">
          <StudyGroupActivePill extraCount={3} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Focus */}
        <div className="lg:col-span-2">
          <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-[#151C27] font-bold text-[18px]">
                Today’s Focus
              </h2>
              <a
                className="text-[#7C3AED] text-[14px] font-semibold hover:underline"
                href="#"
              >
                view all
              </a>
            </div>

            <div className="px-6 pb-6 space-y-4">
              {[
                {
                  title: "COS 202 Project commit",
                  chipLeft: "COS 202",
                  chipLeftBg: "bg-[#EAD9FF] text-[#7C3AED]",
                  chipRight: "HIGH PRIORITY",
                  chipRightBg: "bg-[#FECACA] text-[#991B1B]",
                },
                {
                  title: "Logic & Philosophy chapter 5 excercise",
                  chipLeft: "GST 212",
                  chipLeftBg: "bg-[#BBF7D0] text-[#166534]",
                  chipRight: "MEDIUM PRIORITY",
                  chipRightBg: "bg-[#FED7AA] text-[#9A3412]",
                },
                {
                  title: "Make MTH201 presentation slides",
                  chipLeft: "MTH 201",
                  chipLeftBg: "bg-[#FDE68A] text-[#92400E]",
                  chipRight: "LOW PRIORITY",
                  chipRightBg: "bg-[#DBEAFE] text-[#1D4ED8]",
                },
              ].map((t) => (
                <div
                  key={t.title}
                  className="bg-white border border-[#E7E1F2] rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-lg border border-[#D6CEE7] bg-white" />
                    <div>
                      <div className="text-[#151C27] font-semibold">
                        {t.title}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-[12px] font-semibold px-2 py-1 rounded-full ${t.chipLeftBg}`}
                        >
                          {t.chipLeft}
                        </span>
                        <span
                          className={`text-[12px] font-semibold px-2 py-1 rounded-full ${t.chipRightBg}`}
                        >
                          {t.chipRight}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    aria-label="More"
                    className="text-[#6B7280] hover:text-[#111827]"
                  >
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Session */}
        <FocusSessionCard />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deadlines */}
        <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-[#151C27] font-bold text-[18px]">Deadlines</h2>
            <button aria-label="Alerts" className="text-[#EF4444]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3a6 6 0 0 0-6 6v3.586L4.707 14A1 1 0 0 0 5.414 15h13.172a1 1 0 0 0 .707-1.707L18 12.586V9a6 6 0 0 0-6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M10 18a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="px-6 pb-6 space-y-3">
            {[
              {
                title: "History Essay",
                when: "Due tomorrow",
              },
              {
                title: "Math Quiz Prep",
                when: "Due in 2 days",
              },
              {
                title: "Physics Lab",
                when: "Due Friday",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-xl border border-[#E7E1F2] bg-white px-4 py-3"
              >
                <div className="font-semibold text-[#151C27]">{d.title}</div>
                <div className="text-[13px] text-[#6B7280] mt-1">{d.when}</div>
              </div>
            ))}
          </div>
        </div>

        <PerformanceCard />

        <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm p-6">
          <h2 className="text-[#151C27] font-bold text-[18px]">Quick Notes</h2>
          <p className="mt-3 text-[#6B7280] text-[14px]">
            Keep short reminders here while you work.
          </p>
        </div>
      </div>
    </section>
  );
}
