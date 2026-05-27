"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function LoginPage() {
  // Toggles password visibility in the password input.
  const [showPassword, setShowPassword] = useState(false);

  // Hero image shown on the left side of the login page.
  // Note: assets inside `public/` are referenced from the site root ("/...").
  const heroImage = useMemo(
    () => ({
      src: "/today's focs.png",
      alt: "Today's focus preview",
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-[#EEDFFB] px-6 py-12 flex items-center justify-center">
      {/*
        Login page layout:
        - Left column: branding + marketing copy + static hero image.
        - Right column: login form card.
      */}
      {/* Centered container */}
      <div className="w-full max-w-[1120px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: brand + value prop + hero image */}
        <section className="px-2 lg:px-0">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#DDD5EE] flex items-center justify-center shadow-sm overflow-hidden">
              <Image
                src="/taskp_logo.svg"
                alt="TaskPilot"
                width={26}
                height={26}
              />
            </div>
            <span className="text-[#7C3AED] font-semibold text-[22px]">
              TaskPilot
            </span>
          </div>

          <h1 className="mt-8 text-[54px] leading-[1.02] font-semibold text-[#151C27]">
            Pick up
            <br />
            <span className="text-[#7C3AED]">right where you left off</span>.
          </h1>

          <p className="mt-6 text-[18px] leading-relaxed text-[#6B7280] max-w-[520px]">
            Your tasks, focus blocks, and progress are waiting on your
            dashboard.
          </p>

          {/* Scroll-effect image strip (rotates as you scroll) */}
          {/* Hero image container */}
          <div className="mt-10 w-full max-w-[460px]">
            {/*
              Subtle outline (ring) helps the white image container stand out
              against the light purple page background.
            */}
            <div className="rounded-[28px] overflow-hidden bg-white ring-[0.5px] ring-[#DDD5EE]">
              {/* Keep a consistent image frame regardless of image dimensions */}
              <div className="relative w-full aspect-[4/3] bg-white">
                {/*
                  `object-cover` fills the frame. `object-top` biases cropping toward
                  the bottom (so top headings in screenshots are more likely to remain visible).
                */}
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: login card */}
        <section className="w-full flex lg:justify-center lg:items-start">
          <div className="w-full max-w-[420px] lg:mt-3 rounded-[24px] bg-[#F7F0FF] shadow-[0_40px_120px_rgba(124,58,237,0.32)] ring-1 ring-[#E7E1F2] p-7 sm:p-8">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/taskp_logo.svg"
                alt="TaskPilot"
                width={26}
                height={26}
              />
              <span className="text-[#151C27] font-semibold">TaskPilot</span>
            </div>

            <h2 className="mt-5 text-[26px] font-semibold text-[#151C27]">
              Login
            </h2>
            <p className="mt-1 text-[15px] text-[#6B7280]">
              Shall we continue where we left off?
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // UI-only for now (no auth wired yet): send the user to the dashboard.
                window.location.href = "/dashboard";
              }}
            >
              <div>
                <label className="block text-[12px] tracking-widest font-semibold text-[#6B7280]">
                  EMAIL ADDRESS
                </label>
                <div className="mt-2 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    {/* mail icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6h16v12H4V6Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 7l8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-2xl bg-white px-12 py-3.5 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between gap-4">
                  <label className="block text-[12px] tracking-widest font-semibold text-[#6B7280]">
                    SECRET PASSWORD
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[12px] font-semibold text-[#7C3AED] hover:underline whitespace-nowrap"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="mt-2 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    {/* lock icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 11V8a5 5 0 0 1 10 0v3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 11h12v10H6V11Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-2xl bg-white px-12 py-3.5 pr-12 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                    autoComplete="current-password"
                  />

                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#7C3AED] transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {/* eye icon */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#7C3AED] py-3.5 text-white font-semibold text-[16px] shadow-lg shadow-[#7C3AED]/20 hover:bg-[#8B5CF6] active:opacity-90 transition"
              >
                Login
                <span aria-hidden className="ml-2">
                  →
                </span>
              </button>

              <div className="text-center text-[14px] text-[#6B7280]">
                No account yet?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#7C3AED] hover:underline"
                >
                  Get yours now
                </Link>
              </div>

              <div className="pt-5 text-center text-[13px] text-[#9CA3AF]">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <span className="px-3">•</span>
                <a href="#" className="hover:underline">
                  Terms
                </a>
                <span className="px-3">•</span>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
