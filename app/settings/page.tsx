"use client";

import React, { useRef, useState, useCallback } from "react";
import { User, Lock, Bell, AlertCircle, Check} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

import Toast from "./_components/Toast";
import Toggle from "./_components/Toggle";
import PasswordField from "./_components/PasswordField";


// Types
interface UserData {
  fullName: string;
  email: string;
  photoUrl: string | null;
}

interface PasswordData {
  current: string;
  newPass: string;
  confirm: string;
}

interface NotifPrefs {
  dailyProgress: boolean;
  upcomingDeadlines: boolean;
}


// Deactivate Confirmation Modal
function DeactivateModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-pink-50 border-2 border-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} className="text-[#C11F7E]" />
        </div>
        <h3 className="text-2xl font-bold text-[#151C27] mb-3">
          Deactivate account?
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          This will deactivate your account. All your data will be preserved but
          you won&apos;t be able to log in until you contact support to
          reactivate it.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 rounded-2xl bg-[#C11F7E] text-white font-bold hover:bg-[#a0186b] active:scale-95 transition-all"
          >
            Yes, deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

// Initial state
const INITIAL_USER: UserData = {
  fullName: "Zoe Hassan",
  email: "zoe.hassan@pau.edu.ng",
  photoUrl: null,
};

const INITIAL_NOTIF: NotifPrefs = {
  dailyProgress: false,
  upcomingDeadlines: true,
};

// Page
export default function SettingsPage() {
  /* ---- Account ---- */
  const [savedUser, setSavedUser] = useState<UserData>(INITIAL_USER);
  const [draftUser, setDraftUser] = useState<UserData>(INITIAL_USER);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- Passwords ---- */
  const [passwords, setPasswords] = useState<PasswordData>({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  /* ---- Notifications ---- */
  const [notif, setNotif] = useState<NotifPrefs>(INITIAL_NOTIF);
  const [savedNotif, setSavedNotif] = useState<NotifPrefs>(INITIAL_NOTIF);

  /* ---- UI ---- */
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showDeactivate, setShowDeactivate] = useState(false);

  // ---- Helpers ----
  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  const initials = draftUser.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  // ---- Photo ----
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 800 * 1024) {
      showToast("File too large. Max size is 800 KB.", "error");
      return;
    }
    const url = URL.createObjectURL(file);
    setDraftUser((u) => ({ ...u, photoUrl: url }));
  };

  const handleRemovePhoto = () => {
    setDraftUser((u) => ({ ...u, photoUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---- Password ----
  const handleUpdatePassword = () => {
    setPasswordError("");
    setPasswordSuccess(false);

    if (!passwords.current) {
      return setPasswordError("Please enter your current password.");
    }
    if (passwords.newPass.length < 8) {
      return setPasswordError(
        "New password must be at least 8 characters long.",
      );
    }
    if (passwords.newPass !== passwords.confirm) {
      return setPasswordError("New passwords do not match.");
    }

    // Simulated success
    setPasswordSuccess(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    showToast("Password updated successfully!");
  };

  // ---- Save / Discard ----
  const handleSave = () => {
    setSavedUser(draftUser);
    setSavedNotif(notif);
    showToast("Settings saved successfully!");
  };

  const handleDiscard = () => {
    setDraftUser(savedUser);
    setNotif(savedNotif);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setPasswordError("");
    setPasswordSuccess(false);
  };

  // ---- Deactivate ----
  const handleDeactivateConfirm = () => {
    setShowDeactivate(false);
    showToast("Account has been deactivated.", "error");
  };

  const hasUnsavedChanges =
    draftUser.fullName !== savedUser.fullName ||
    draftUser.email !== savedUser.email ||
    draftUser.photoUrl !== savedUser.photoUrl ||
    notif.dailyProgress !== savedNotif.dailyProgress ||
    notif.upcomingDeadlines !== savedNotif.upcomingDeadlines;

  return (
    <DashboardShell>
      <div className="p-10 pb-24 max-w-5xl mx-auto space-y-10">
        {/* ── Page Header ─────────────────────────────── */}
        <div>
          <h1 className="text-4xl font-bold text-[#151C27] mb-2">Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage your account and customize your experience.
          </p>
        </div>

        {/* ── 1. Account Management ────────────────────── */}
        <section className="bg-[#F3E8FF]/40 border border-purple-100 rounded-[32px] p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-10 text-[#9333EA]">
            <User size={22} strokeWidth={2.5} />
            <h2 className="font-bold text-xl">Account management</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="fullName"
                className="text-xs font-bold text-[#696174] ml-1 uppercase tracking-wider"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={draftUser.fullName}
                onChange={(e) =>
                  setDraftUser((u) => ({ ...u, fullName: e.target.value }))
                }
                placeholder="Name Surname"
                className="w-full h-16 px-6 bg-[#B7AFB9]/20 rounded-2xl border border-transparent focus:border-purple-300 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-[#151C27] font-medium"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="text-xs font-bold text-[#696174] ml-1 uppercase tracking-wider"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={draftUser.email}
                onChange={(e) =>
                  setDraftUser((u) => ({ ...u, email: e.target.value }))
                }
                placeholder="name.surname@pau.edu.ng"
                className="w-full h-16 px-6 bg-[#B7AFB9]/20 rounded-2xl border border-transparent focus:border-purple-300 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-[#151C27] font-medium"
              />
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex items-center gap-8">
            <div className="w-28 h-28 rounded-[28px] overflow-hidden bg-[#C11F7E] shadow-inner flex items-center justify-center shrink-0">
              {draftUser.photoUrl ? (
                <img
                  src={draftUser.photoUrl}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {initials || "?"}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#9333EA] text-white px-7 py-3 rounded-2xl font-bold text-sm hover:bg-[#7C3AED] active:scale-95 transition-all shadow-md shadow-purple-200"
                >
                  Change photo
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={!draftUser.photoUrl}
                  className="text-[#C11F7E] font-bold text-sm hover:bg-pink-50 px-4 py-3 rounded-2xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-gray-400 ml-1">
                JPG, GIF or PNG. Max size of 800 K
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Change Password ───────────────────────── */}
        <section className="bg-[#F3E8FF]/40 border border-purple-100 rounded-[32px] p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-10 text-[#9333EA]">
            <Lock size={22} strokeWidth={2.5} />
            <h2 className="font-bold text-xl">Change Password</h2>
          </div>

          {/* Inline feedback */}
          {passwordError && (
            <div className="mb-6 flex items-center gap-2 bg-pink-50 border border-pink-200 text-[#C11F7E] rounded-xl px-4 py-3 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              {passwordError}
            </div>
          )}
          {passwordSuccess && !passwordError && (
            <div className="mb-6 flex items-center gap-2 bg-purple-50 border border-purple-200 text-[#9333EA] rounded-xl px-4 py-3 text-sm font-medium">
              <Check size={16} className="shrink-0" />
              Password updated successfully!
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <PasswordField
                label="Current password"
                value={passwords.current}
                onChange={(v) => {
                  setPasswordError("");
                  setPasswordSuccess(false);
                  setPasswords((p) => ({ ...p, current: v }));
                }}
              />
              <PasswordField
                label="New password"
                value={passwords.newPass}
                onChange={(v) => {
                  setPasswordError("");
                  setPasswordSuccess(false);
                  setPasswords((p) => ({ ...p, newPass: v }));
                }}
              />
              <PasswordField
                label="Confirm new password"
                value={passwords.confirm}
                onChange={(v) => {
                  setPasswordError("");
                  setPasswordSuccess(false);
                  setPasswords((p) => ({ ...p, confirm: v }));
                }}
              />
            </div>

            <div className="flex flex-col justify-between items-end pb-2 md:min-w-[180px]">
              <button
                type="button"
                className="text-[#9333EA] text-sm font-bold underline underline-offset-2 hover:text-[#7C3AED] transition-colors"
              >
                Forgot password?
              </button>
              <button
                type="button"
                onClick={handleUpdatePassword}
                className="bg-[#9333EA] text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-md shadow-purple-200 hover:bg-[#7C3AED] active:scale-95 transition-all mt-6 md:mt-0"
              >
                Update password
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. Notification Preferences ──────────────── */}
        <section className="bg-[#F3E8FF]/40 border border-purple-100 rounded-[32px] p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-8 text-[#9333EA]">
            <Bell size={22} strokeWidth={2.5} />
            <h2 className="font-bold text-xl">Notification preferences</h2>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center gap-8">
              <div>
                <p className="font-bold text-[#151C27] text-base">
                  Daily Progress Reminders
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Get a summary of your focus sessions every morning.
                </p>
              </div>
              <Toggle
                enabled={notif.dailyProgress}
                onToggle={() =>
                  setNotif((n) => ({
                    ...n,
                    dailyProgress: !n.dailyProgress,
                  }))
                }
                label="Toggle daily progress reminders"
              />
            </div>

            <div className="flex justify-between items-center gap-8">
              <div>
                <p className="font-bold text-[#151C27] text-base">
                  Upcoming Deadlines
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Alerts for tasks due in the next 24 hours.
                </p>
              </div>
              <Toggle
                enabled={notif.upcomingDeadlines}
                onToggle={() =>
                  setNotif((n) => ({
                    ...n,
                    upcomingDeadlines: !n.upcomingDeadlines,
                  }))
                }
                label="Toggle upcoming deadlines alerts"
              />
            </div>
          </div>
        </section>

        {/* ── Footer Actions ───────────────────────────── */}
        <div className="flex justify-between items-center pt-10 border-t border-purple-100">
          <button
            type="button"
            onClick={() => setShowDeactivate(true)}
            className="border-2 border-[#C11F7E] text-[#C11F7E] px-8 py-3 rounded-2xl font-bold hover:bg-pink-50 active:scale-95 transition-all"
          >
            Deactivate account
          </button>

          <div className="flex gap-8 items-center">
            <button
              type="button"
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges}
              className="font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 hover:text-[#151C27] disabled:hover:text-gray-600"
            >
              Discard changes
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="bg-[#9333EA] text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-purple-200 hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* ── Deactivate Confirmation Modal ─────────────── */}
      {showDeactivate && (
        <DeactivateModal
          onConfirm={handleDeactivateConfirm}
          onCancel={() => setShowDeactivate(false)}
        />
      )}

      {/* ── Toast Notification ────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </DashboardShell>
  );
}
