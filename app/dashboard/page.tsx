import getTimeGreeting from "./_components/getTimeGreeting";
import StudyGroupActivePill from "@/components/StudyGroupActivePill";
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
                  d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 19a2 2 0 0 0 4 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="px-6 pb-6 space-y-4">
            <div className="bg-white border border-[#E7E1F2] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FCA5A5] text-[#7F1D1D] flex flex-col items-center justify-center font-bold">
                <div className="text-[12px]">OCT</div>
                <div className="text-[18px] leading-none">12</div>
              </div>
              <div>
                <div className="text-[#151C27] font-semibold">
                  Final year project
                </div>
                <div className="text-[#6B7280] text-[13px]">
                  2 days remaining
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E7E1F2] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D8B4FE] text-[#3B0764] flex flex-col items-center justify-center font-bold">
                <div className="text-[12px]">OCT</div>
                <div className="text-[18px] leading-none">15</div>
              </div>
              <div>
                <div className="text-[#151C27] font-semibold">
                  Lab Report: Plant Cells
                </div>
                <div className="text-[#6B7280] text-[13px]">
                  5 days remaining
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="bg-[#EEE7FA] border border-[#DDD5EE] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-[#151C27] font-bold text-[18px]">Courses</h2>
            <button
              aria-label="Go"
              className="text-[#6B7280] hover:text-[#111827] text-[20px]"
            >
              →
            </button>
          </div>
          <div className="px-6 pb-6 grid grid-cols-1 gap-4">
            <div className="bg-white border border-[#E7E1F2] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAD9FF] flex items-center justify-center text-[#7C3AED]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5h16v10H7l-3 3V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[#151C27] font-semibold">
                  Psychology 101
                </div>
                <div className="text-[#6B7280] text-[13px]">
                  Room 402~ 10:00 AM
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E7E1F2] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#BBF7D0] flex items-center justify-center text-[#166534] font-bold">
                Σ
              </div>
              <div>
                <div className="text-[#151C27] font-semibold">Calculus II</div>
                <div className="text-[#6B7280] text-[13px]">
                  Online~ 1:30 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <PerformanceCard />
      </div>

      <div className="mt-10 pb-10 text-center text-[#6B7280] text-[12px]">
        © 2026 TaskPilot. Designed for quiet and academic excellence
      </div>
    </section>
  );
}
