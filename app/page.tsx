export default function Home() {
  return (
    <main  className = 'min-h-screen bg-[#EEDFFB]'>
      {/*Navigation Bar Section*/}
      <div className="flex justify-start items-center px-20 py-6 bg-white gap-4">
        <div className="text-[#9333EA] text-[24px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>TaskPilot</div>
        <div className="flex gap-8 text-[#6B7280] font-normal ">
          <p className="hover:text-[#630ED4] cursor-pointer">Dashboard</p>
          <p className="hover:text-[#630ED4] cursor-pointer">Schedule</p>
          <p className="hover:text-[#630ED4] cursor-pointer">Course</p>
          <p className="hover:text-[#630ED4] cursor-pointer">Focus</p>
        </div>
      </div>




      {/*The body of the landing page */}
      <div className="p-15">
        
        <p className="text-[#696174] font-normal">
          Your academic zen space
        </p>

        <h1 className="text-[48px] font-bold text-[#151C27] leading-tight mt-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          Experience Calm <br /> Productivity with<br/><span className="text-[#630ED4]">TaskPilot</span>
        </h1>
        <p className="text-[18px] font-normal text-[#635B6E] leading-tight mt-4" style={{ fontFamily: 'Inter, sans-serif'}}>Simplify your student life. Manage tasks, master deep <br /> focus, and track your academic journey in an environment <br /> designed for peace of mind.</p>
      </div>
      <div className="flex gap-8 p-15">
        <button className="bg-[#630ED4] text-white font-bold py-8 px-16 rounded-lg hover:opacity-90 transition-opacity" >
          Get Started for Free
        </button>
        <button className="bg-white text-[#151C27] font-bold py-8 px-16 rounded-lg hover:opacity-90 transition-opacity" >
          See How It Works
        </button>
      </div>
    </main>
  )
}