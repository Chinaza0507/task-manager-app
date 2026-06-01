"use client";

import { useCallback, useEffect, useMemo,useRef, useState } from "react";
import {
  CloudRain,
  Leaf,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  SlidersHorizontal,
  Waves,
  AudioLines,
} from "lucide-react";

const TOTAL_SESSIONS = 4;

type FocusTask = {
  id: string;
  title: string;
  dueLabel: string;
};

const INITIAL_TASKS: FocusTask[] = [
  { id: "nav", title: "React nav bar component", dueLabel: "Due in 2 days" },
  { id: "table", title: "Data table for tasks", dueLabel: "Due in 2 days" },
  { id: "cards", title: "Dashboard stat cards", dueLabel: "Due in 2 days" },
  { id: "hero", title: "Landing hero section", dueLabel: "Due in 2 days" },
];

const AMBIENCE = [
  { id: "rain", label: "Rainfall", icon: CloudRain },
  { id: "white", label: "White noise", icon: AudioLines },
  { id: "waves", label: "Waves", icon: Waves },
  { id: "forest", label: "Forest", icon: Leaf },
] as const;

type Mode = "focus" | "break";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TimerPage() {
  const [focusMinutes, setFocusMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);

  const [mode, setMode] = useState<Mode>("focus");
  const [sessionIndex, setSessionIndex] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [tasks] = useState(INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState(INITIAL_TASKS[0]?.id);
  const [activeAmbience, setActiveAmbience] = useState<(typeof AMBIENCE)[number]["id"]>(AMBIENCE[0].id);
  const [hasAudioConsent, setHasAudioConsent] = useState(false);

  const audioRef = useRef<{
    ctx: AudioContext | null;
    source: AudioBufferSourceNode | null;
    gain: GainNode | null;
    filter: BiquadFilterNode | null;
  }>({ ctx: null, source: null, gain: null, filter: null });

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setMode("focus");
    setSessionIndex(1);
    setRemainingSeconds(focusMinutes * 60);
  }, [focusMinutes]);

  const skipSegment = useCallback(() => {
    if (mode === "focus") {
      setMode("break");
      setRemainingSeconds(breakMinutes * 60);
      setIsRunning(autoStartBreaks);
      return;
    }

    if (sessionIndex >= TOTAL_SESSIONS) {
      resetTimer();
      return;
    }

    setSessionIndex((prev) => prev + 1);
    setMode("focus");
    setRemainingSeconds(focusMinutes * 60);
    setIsRunning(false);
  }, [
    mode,
    breakMinutes,
    autoStartBreaks,
    sessionIndex,
    focusMinutes,
    resetTimer,
  ]);

  const handleComplete = useCallback(() => {
    if (mode === "focus") {
      setMode("break");
      setRemainingSeconds(breakMinutes * 60);
      setIsRunning(autoStartBreaks);
      return;
    }

    if (sessionIndex >= TOTAL_SESSIONS) {
      resetTimer();
      return;
    }

    setSessionIndex((prev) => prev + 1);
    setMode("focus");
    setRemainingSeconds(focusMinutes * 60);
    setIsRunning(false);
  }, [
    mode,
    breakMinutes,
    autoStartBreaks,
    sessionIndex,
    focusMinutes,
    resetTimer,
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, handleComplete]);

  useEffect(() => {
    if (isRunning) return;

    setRemainingSeconds(
      mode === "focus" ? focusMinutes * 60 : breakMinutes * 60,
    );
  }, [focusMinutes, breakMinutes, mode, isRunning]);

  const timeLabel = useMemo(
    () => formatTime(remainingSeconds),
    [remainingSeconds],
  );

  const sessionLabel =
    mode === "focus" ? `Session ${sessionIndex} of ${TOTAL_SESSIONS}` : "Break";

    const segmentLabel = mode === "focus" ? "Deep focus session" : "Short break";

  const stopAmbience = useCallback(() => {
    const { source, gain, filter } = audioRef.current;
    if (source) {
      source.stop();
      source.disconnect();
    }
    if (gain) gain.disconnect();
    if (filter) filter.disconnect();
    audioRef.current.source = null;
    audioRef.current.gain = null;
    audioRef.current.filter = null;
  }, []);

  const playAmbience = useCallback(
    (id: (typeof AMBIENCE)[number]["id"]) => {
      if (id !== "rain" && id !== "white") {
        stopAmbience();
        return;
      }

      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextCtor) return;

      if (!audioRef.current.ctx) {
        audioRef.current.ctx = new AudioContextCtor();
      }

      const ctx = audioRef.current.ctx;
      if (!ctx) return;

      ctx.resume().catch(() => undefined);
      stopAmbience();

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = id === "white" ? 0.05 : 0.04;

      if (id === "rain") {
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 900;
        source.connect(filter);
        filter.connect(gain);
        audioRef.current.filter = filter;
      } else {
        source.connect(gain);
      }

      gain.connect(ctx.destination);
      source.start();

      audioRef.current.source = source;
      audioRef.current.gain = gain;
    },
    [stopAmbience],
  );

  useEffect(() => {
    if (!hasAudioConsent) return;
    playAmbience(activeAmbience);
  }, [activeAmbience, hasAudioConsent, playAmbience]);

  useEffect(() => {
    return () => {
      stopAmbience();
      if (audioRef.current.ctx) {
        audioRef.current.ctx.close().catch(() => undefined);
      }
    };
  }, [stopAmbience]);


  const updateDuration = (
    setter: (value: number) => void,
    current: number,
    delta: number,
  ) => {
    const next = Math.min(90, Math.max(5, current + delta));
    setter(next);
  };

  return (
    <section className="py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-extrabold text-[#151C27]">
            Focus timer
          </h1>
          <p className="text-[#6B7280] mt-2 text-[15px]">
            Stay present, breathe, and let the next session carry you forward.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-[#EFE6FB] border border-[#E2D5F2] rounded-[28px] shadow-[0_10px_24px_rgba(17,24,39,0.08)] px-6 sm:px-10 py-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D9C7FF] text-[#7C3AED] font-semibold text-[14px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              {segmentLabel}
            </div>

            <div className="mt-6 text-[64px] sm:text-[72px] font-bold text-[#151C27] tracking-tight">
              {timeLabel}
            </div>

            <div className="mt-2 text-[#6B7280] text-[14px]">
              {sessionLabel}
              {mode === "focus" && activeTask ? (
                <span className="text-[#7C3AED] font-semibold">
                  {" "}
                  • Working on {activeTask.title}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={resetTimer}
                className="w-12 h-12 rounded-full border border-[#D9C8FF] text-[#8B5CF6] flex items-center justify-center hover:bg-white"
                aria-label="Reset timer"
              >
                <RotateCcw size={18} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={() => setIsRunning((prev) => !prev)}
                className="w-16 h-16 rounded-full bg-[#A855F7] text-white flex items-center justify-center shadow-[0_10px_18px_rgba(168,85,247,0.35)] hover:opacity-90"
                aria-label={isRunning ? "Pause" : "Start"}
              >
                {isRunning ? (
                  <Pause size={28} strokeWidth={2.4} />
                ) : (
                  <Play size={28} strokeWidth={2.4} />
                )}
              </button>
              <button
                type="button"
                onClick={skipSegment}
                className="w-12 h-12 rounded-full border border-[#D9C8FF] text-[#8B5CF6] flex items-center justify-center hover:bg-white"
                aria-label="Skip segment"
              >
                <SkipForward size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMBIENCE.map(({ id, label, icon: Icon }) => {
              const isActive = activeAmbience === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    if (!hasAudioConsent) setHasAudioConsent(true);
                    setActiveAmbience(id);
                  }}
                  className={`rounded-2xl px-4 py-6 border transition-all text-center shadow-sm ${
                    isActive
                      ? "bg-[#A78BFA] border-[#A78BFA] text-white"
                      : "bg-[#EDE4F7] border-[#E3D8F2] text-[#7C3AED]"
                  }`}
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center bg-white/60">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="text-[13px] font-semibold">{label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#EFE6FB] border border-[#E2D5F2] rounded-[24px] shadow-[0_10px_24px_rgba(17,24,39,0.08)] p-6">
            <div className="text-[16px] font-semibold text-[#151C27]">
              Focus on
            </div>

            <div className="mt-4 space-y-3">
              {tasks.map((task) => {
                const isActive = task.id === activeTaskId;
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setActiveTaskId(task.id)}
                    className={`w-full flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[#A855F7] bg-white"
                        : "border-transparent bg-white/90"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-md border-2 border-[#111827]" />
                    <div>
                      <div className="text-[14px] font-semibold text-[#111827]">
                        {task.title}
                      </div>
                      <div className="text-[12px] text-[#DC2626]">
                        {task.dueLabel}
                      </div>
                    </div>
                  </button>
                );
              })}

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-full border border-[#E2D5F2] bg-white px-4 py-3 text-[13px] font-semibold text-[#111827] hover:opacity-90"
              >
                <span className="w-6 h-6 rounded-full border border-[#111827] flex items-center justify-center text-[16px]">
                  +
                </span>
                Select another task
              </button>
            </div>
          </div>

          <div className="bg-[#EFE6FB] border border-[#E2D5F2] rounded-[24px] shadow-[0_10px_24px_rgba(17,24,39,0.08)] p-6">
            <div className="flex items-center justify-between">
              <div className="text-[16px] font-semibold text-[#151C27]">
                Settings
              </div>
              <SlidersHorizontal size={18} strokeWidth={2} />
            </div>

            <div className="mt-5 space-y-4 text-[14px] text-[#4B5563]">
              <div className="flex items-center justify-between">
                <span>Focus duration</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateDuration(setFocusMinutes, focusMinutes, -5)}
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D5F2] text-[#6B7280]"
                  >
                    −
                  </button>
                  <span className="min-w-[50px] text-center rounded-lg bg-[#D9C7FF] text-[#7C3AED] font-semibold px-3 py-1">
                    {focusMinutes}m
                  </span>
                  <button
                    type="button"
                    onClick={() => updateDuration(setFocusMinutes, focusMinutes, 5)}
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D5F2] text-[#6B7280]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Break duration</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateDuration(setBreakMinutes, breakMinutes, -5)}
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D5F2] text-[#6B7280]"
                  >
                    −
                  </button>
                  <span className="min-w-[50px] text-center rounded-lg bg-[#D9C7FF] text-[#7C3AED] font-semibold px-3 py-1">
                    {breakMinutes}m
                  </span>
                  <button
                    type="button"
                    onClick={() => updateDuration(setBreakMinutes, breakMinutes, 5)}
                    className="w-8 h-8 rounded-full bg-white border border-[#E2D5F2] text-[#6B7280]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Auto-start breaks</span>
                <button
                  type="button"
                  onClick={() => setAutoStartBreaks((prev) => !prev)}
                  className={`w-12 h-7 rounded-full p-1 transition ${
                    autoStartBreaks ? "bg-[#7C3AED]" : "bg-[#6B7280]"
                  }`}
                  aria-pressed={autoStartBreaks}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition ${
                      autoStartBreaks ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}