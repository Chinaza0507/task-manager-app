import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EEDFFB]">
      {/*Navigation Bar Section*/}
      <div className="flex justify-start items-center px-8 py-3 bg-white gap-4">
        <div className="flex items-center gap-2">
          {" "}
          {/* Grouped logo and text */}
          <img src="taskp_logo.svg" alt="TaskPilot Icon" className="w-9 h-9" />
          <div
            className="text-[#9333EA] text-[24px] font-bold"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            TaskPilot
          </div>
        </div>
        <div className="flex gap-8 text-[#6B7280] font-normal ">
          <Link
            href="/dashboard"
            className="hover:text-[#7C3AED] cursor-pointer"
          >
            Dashboard
          </Link>
          <p className="hover:text-[#7C3AED] cursor-pointer">Schedule</p>
          <p className="hover:text-[#7C3AED] cursor-pointer">Course</p>
          <p className="hover:text-[#7C3AED] cursor-pointer">Focus</p>
        </div>
      </div>

      {/*The body of the landing page */}
      <div className="px-8 pt-16 pb-10">
        <p className="text-[#696174] font-normal">Your academic zen space</p>

        <h1
          className="text-[48px] font-bold text-[#151C27] leading-tight mt-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Experience Calm <br /> Productivity with
          <br />
          <span className="text-[#7C3AED]">TaskPilot</span>
        </h1>
        <p
          className="text-[18px] font-normal text-[#635B6E] leading-tight mt-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Simplify your student life. Manage tasks, master deep <br /> focus,
          and track your academic journey in an environment <br /> designed for
          peace of mind.
        </p>
      </div>
      <div className="flex gap-8 p-10 pb-0 mb-6">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center bg-[#7C3AED] text-white font-bold py-8 px-16 rounded-lg hover:opacity-90 transition-opacity"
        >
          Get Started for Free
        </Link>
        <button className="bg-white text-[#151C27] font-bold py-8 px-16 rounded-lg hover:opacity-90 transition-opacity">
          See How It Works
        </button>
      </div>
      <div className="flex px-10 mt-2 mb-16">
        <p className="text-[#696174] text-normal">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold hover:text-[#7C3AED] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      {/*FEATURES SECTION */}
      <div className="bg-white px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-[#151C27] text-[24px] font-normal">
            Everything you need to excel
          </h2>
          <p className="text-[#635B6E] text-[16px] font-normal ">
            A workspace that feels like a clean desk in morning light.
          </p>
        </div>

        {/* THE CARD SECTION */}
        <div className="flex flex-wrap justify-center gap-y-8 gap-x-54">
          {" "}
          {/* CARD SPACING*/}
          {/* FOCUS CARD*/}
          <div className="bg-[#F3EAFA] p-10 rounded-xl border border-[#CCC3D8] shadow-sm max-w-[400px]">
            <div className="w-12 h-12 bg-[#EADDFF] rounded-xl flex items-center justify-center mb-2 ">
              <svg
                className="w-6 h-6 text-[#7C3AED]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-[#151C27] font-normal text-[20px] mb-2">
              Focus Timer
            </h3>
            <p className="text-[#151C27] font-normal text-[16px]  ">
              Enter deep work sessions with our integrated Pomodoro- style
              timer. Ambient sounds and distraction-free modes help you stay in
              the flow.
            </p>
          </div>
          {/* END OF CODE FOR FOCUS CARD */}
          {/*PERFOMANCE CARD */}
          <div className="bg-[#F3EAFA] p-10 rounded-xl border border-[#CCC3D8] shadow-sm max-w-[400px]">
            <div className="w-12 h-12 bg-[#76f4b6] rounded-xl flex flex-col items-center justify-center mb-2 ">
              {/* Graph Icon SVG */}
              <svg
                className="w-6 h-6 text-[#151C27]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10m14 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14m0 0h2a2 2 0 002-2z"
                />
              </svg>
            </div>
            <h3 className="text-[#151C27] font-normal text-[20px] mb-2">
              Performance
            </h3>
            <p className="text-[#151C27] font-normal text-[16px] pb-6">
              Visualize your progress with gentle analytics that celebrate
              consistency over intensity.
            </p>

            {/* PROGRESS BAR SECTION */}
            <div className="w-full">
              <div className="w-full h-2 bg-[#E9DEF5] rounded-full overflow-hidden ">
                <div className="bg-[#7C3AED] h-full w-[75%] rounded-full "></div>
              </div>
              <div className="flex justify-between text-[12px] text-[#6B7280] font-normal mt-3">
                <span>Weekly Goal</span>
                <span>75%</span>
              </div>
            </div>
          </div>
          {/* END OF CODE FOR PERFOMANCE CARD */}
          {/* TASK MANAGEMENT CARD */}
          <div className="bg-[#F3EAFA] p-10 rounded-xl border border-[#CCC3D8] shadow-sm max-w-[400px]">
            <div className="w-12 h-12 bg-[#EADDFF] rounded-xl flex items-center justify-center mb-2">
              {/* Clipboard/List Icon */}
              <svg
                className="w-6 h-6 text-[#7C3AED]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-[#151C27] font-normal text-[20px] mb-2">
              Task Management
            </h3>
            <p className="text-[#6B7280] text-[16px] mb-2">
              Intelligent sorting that prioritizes what matters most.Organize by
              course, due date, or energy level.
            </p>

            {/* The Checklist Items */}
            <div className="space-y-3 gap-2 pt-4">
              <div className="flex items-center gap-3 opacity-50 line-through">
                <div className="w-5 h-5 border border-[#7C3AED] rounded flex items-center justify-center bg-[#7C3AED]">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-[#635B6E]">Submit Bio Essay</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border border-gray-300 rounded"></div>
                <span className="text-sm text-[#151C27]">
                  Prep for Math Quiz
                </span>
              </div>
            </div>
          </div>
          {/* END OF CODE FOR TASK MANAGEMENT CARD */}
          {/* RESOURCE HUB CARD */}
          <div className="bg-[#F3EAFA] p-10 rounded-xl border border-[#CCC3D8] shadow-sm max-w-[400px]">
            <div className="w-12 h-12 bg-[#EADDFF] rounded-xl flex items-center justify-center mb-2">
              {/* Folder Icon */}
              <svg
                className="w-6 h-6 text-[#7C3AED]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-[#151C27] font-normal text-[20px] mb-2">
              Resource Hub
            </h3>
            <p className="text-[#6B7280] text-[16px]">
              Store study guides, links, and lecture notes right next to your
              tasks. Everything in one place.
            </p>
          </div>
          {/*END OF CODE FOR RESOURCE HUB */}
        </div>

        {/* BOTTOM SECTION */}
        <div className="bg-[#EEDFFB] px-8 py-20 ">
          {/* TESTIMONIALS SECTION */}
          <div className="bg-[#7C3AED] rounded-[24px] p-16 text-center max-w-[1216px] mx-auto mb-20">
            <h2 className="text-white text-[24px] font-bold mb-10">
              Student Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sarah */}
              <div className="bg-white/10 border border-white/20 backdrop-blur text-left p-8 rounded-3xl">
                <p className="text-[#EDE0FF] text-[16px] italic mb-6">
                  &ldquo;TaskPilot changed how I approach my finals. The
                  interface actually makes me feel less stressed just by looking
                  at it.&rdquo;
                </p>
                <div>
                  <p className="text-white font-bold text-[16px]">
                    Timi Martins
                  </p>
                  <p className="text-[#EDE0FF]/70 text-[13px]">
                    Computer Science Student
                  </p>
                </div>
              </div>
              {/* David */}
              <div className="bg-white/10 border border-white/20 backdrop-blur text-left p-8 rounded-3xl">
                <p className="text-[#EDE0FF] text-[16px] italic mb-6">
                  &ldquo;The focus timer is the only thing that keeps me off my
                  phone. The breathable UI is a breath of fresh air compared to
                  other tools.&rdquo;
                </p>
                <p className="text-white font-bold text-[16px]">
                  Valerie Balogun
                </p>
                <p className="text-[#EDE0FF]/70 text-[13px]">Law Student</p>
              </div>
              {/* Elizabeth */}
              <div className="bg-white/10 border border-white/20 backdrop-blur text-left p-8 rounded-3xl">
                <p className="text-[#EDE0FF] text-[16px] italic mb-6">
                  &ldquo;Finally a task manager that doesn&#39;t feel like a
                  spreadsheet. It&#39;s beautiful, functional, and actually fun
                  to use.&rdquo;
                </p>
                <div>
                  <p className="text-white font-bold text-[16px]">
                    Peace Oluwawande
                  </p>
                  <p className="text-[#EDE0FF]/70 text-[13px]">
                    Accounting Student
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* READY TO FIND YOUR FOCUS SECTION */}
          <div className="text-center">
            <p className="text-[32px] font-bold text-[#151C27] mb-2">
              Ready to find your focus?
            </p>
            <p className="text-[18px] font-normal text-[#635B6E]">
              Join 50,000+ students who are reclaiming their time and peace of
              mind.
            </p>
            <div className="flex items-center gap-8 mt-4 p-10 pb-0 mb-6 justify-center">
              <Link
                href="/signup"
                className="bg-[#7C3AED] text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity"
              >
                Create your free account
              </Link>
              <p className="text-[#7C3AED] font-bold cursor-pointer hover:underline">
                Explore Premium Plans
              </p>
            </div>
          </div>

          <footer className="w-full bg-white px-12 py-8 border-t border-gray-100 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="text-[#7C3AED] text-[20px] font-bold">
                TaskPilot
              </div>
              <p className="text-[#6B7280] text-[13px]">
                © 2026 TaskPilot • Breathable Productivity
              </p>
            </div>

            <div className="flex gap-8 text-[14px] text-[#6B7280]">
              <p className="hover:text-[#7C3AED] cursor-pointer">
                Privacy Policy
              </p>
              <p className="hover:text-[#7C3AED] cursor-pointer">
                Terms of Service
              </p>
              <p className="hover:text-[#7C3AED] cursor-pointer">
                Student Discounts
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                🌐
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                @
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
