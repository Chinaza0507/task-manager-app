"use client";

import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#EEDFFB] px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-[520px] rounded-[24px] bg-[#F7F0FF] shadow-[0_40px_120px_rgba(124,58,237,0.32)] ring-1 ring-[#E7E1F2] p-7 sm:p-8">
        <div className="flex items-center justify-center gap-2">
          <Image src="/taskp_logo.svg" alt="TaskPilot" width={26} height={26} />
          <span className="text-[#151C27] font-semibold">TaskPilot</span>
        </div>

        <h1 className="mt-6 text-[26px] font-semibold text-[#151C27]">
          Forgot your password?
        </h1>
        <p className="mt-2 text-[15px] text-[#6B7280]">
          Enter your email and we’ll send you a reset link.
        </p>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Reset link flow not wired yet.");
          }}
        >
          <div>
            <label className="block text-[12px] tracking-widest font-semibold text-[#6B7280]">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="mt-2 w-full rounded-2xl bg-white px-4 py-3.5 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              autoComplete="email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#7C3AED] py-3.5 text-white font-semibold text-[16px] shadow-lg shadow-[#7C3AED]/20 hover:opacity-95 active:opacity-90 transition"
          >
            Send reset link
          </button>

          <div className="text-center text-[14px] text-[#6B7280]">
            Remembered it?{" "}
            <Link href="/login" className="font-semibold text-[#7C3AED] hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
