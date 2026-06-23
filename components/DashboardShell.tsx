"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  Folder,
  HelpCircle,
  LayoutGrid,
  ListChecks,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-5 h-5 items-center justify-center">
      {children}
    </span>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpWrapRef = useRef<HTMLDivElement | null>(null);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const excludedRoutes = [
    "/timer",
    "/dashboard/folders",
    "/settings",
  ];

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;

      if (helpWrapRef.current && !helpWrapRef.current.contains(target)) {
        setHelpOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutGrid size={18} strokeWidth={2} />,
      },
      {
        label: "Task list",
        href: "/tasklist",
        icon: <ListChecks size={18} strokeWidth={2} />,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: <Calendar size={18} strokeWidth={2} />,
      },
      {
        label: "Focus timer",
        href: "/timer",
        icon: <Clock size={18} strokeWidth={2} />,
      },
      {
        label: "Folders",
        href: "/folders",
        icon: <Folder size={18} strokeWidth={2} />,
      },
    ],
    [],
  );

  const sidebarWidth = sidebarHovered ? "w-[280px]" : "w-[88px]";
  const headerLeft = sidebarHovered ? "left-[280px]" : "left-[88px]";
  const contentLeft = sidebarHovered ? "ml-[280px]" : "ml-[88px]";
  const handleLogout = () => {
    setUserMenuOpen(false);
    router.push("/login");
  };  
  return (
    <div className="min-h-screen bg-[#EFE6FB]">
      {/* Fixed sidebar */}
      <aside
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={cx(
          "fixed left-0 top-0 h-screen bg-[#F3ECFF] border-r border-[#E7E1F2] px-4 py-6 flex flex-col z-20 overflow-x-hidden transition-[width] duration-200 ease-out",
          sidebarWidth,
        )}
      >
        <div className="flex items-center justify-center md:justify-between">
          <Link
            href="/"
            aria-label="Go to landing page"
            className="flex items-center gap-3 justify-center md:justify-start transition-transform hover:scale-[1.01]"
          >
            <img src="/taskp_logo.svg" alt="TaskPilot" className="w-10 h-10" />
            <div
              className={cx(
                "leading-tight",
                sidebarHovered ? "block" : "hidden",
              )}
            >
              <div className="text-[#151C27] font-bold text-[18px]">
                TaskPilot
              </div>
              <div className="text-[#6B7280] text-[12px]">
                Student task manager
              </div>
            </div>
          </Link>
        </div>

        <nav className="mt-6 space-y-2">
          {navItems.map((item) => {
            const isActive = item.href !== "#" && pathname === item.href;
            const base =
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors select-none";
            const active = "bg-[#8B5CF6] text-white font-semibold";
            const inactive = "text-[#151C27] hover:bg-white/60";

            const content = (
              <>
                <span
                  className={cx("text-current", !isActive && "text-[#6B7280]")}
                >
                  <Icon>{item.icon}</Icon>
                </span>
                <span
                  className={cx(
                    "font-semibold whitespace-nowrap",
                    sidebarHovered ? "inline" : "hidden",
                  )}
                >
                  {item.label}
                </span>
              </>
            );

            return item.href === "#" ? (
              <a
                key={item.label}
                href="#"
                className={cx(base, isActive ? active : inactive)}
                title={item.label}
              >
                {content}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cx(base, isActive ? active : inactive)}
                title={item.label}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 space-y-2">
          {/* Settings Link with Active Highlight */}
          <Link
            href="/settings"
            className={cx(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors select-none",
              pathname === "/settings"
                ? "bg-[#8B5CF6] text-white font-semibold"
                : "text-[#151C27] hover:bg-white/60",
            )}
          >
            <span
              className={cx(
                pathname === "/settings" ? "text-white" : "text-[#6B7280]",
              )}
            >
              <Icon>
                <Settings size={18} strokeWidth={2} />
              </Icon>
            </span>
            <span
              className={cx(
                "font-semibold whitespace-nowrap",
                sidebarHovered ? "inline" : "hidden",
              )}
            >
              Settings
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#151C27] hover:bg-white/60"
          >
            <span className="text-[#6B7280]">
              <Icon>
                <LogOut size={18} strokeWidth={2} />
              </Icon>
            </span>
            <span
              className={cx(
                "font-semibold whitespace-nowrap",
                sidebarHovered ? "inline" : "hidden",
              )}
            >
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Fixed top bar */}
      {!excludedRoutes.includes(pathname) && (
        <header
          className={cx(
            "fixed top-0 right-0 bg-white border-b border-[#E7E1F2] z-10",
            headerLeft,
          )}
        >
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex-1">
              <div className="max-w-[560px]">
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                    <Search size={18} strokeWidth={2} />
                  </span>
                  <input
                    aria-label="Search"
                    placeholder="Search tasks, notes or folders..."
                    className="w-full h-10 rounded-full bg-[#ECE6F6] border border-[#E0D7EF] shadow-sm pl-11 pr-4 text-[14px] text-[#111827] placeholder:text-[#6B7280] placeholder:font-medium outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="h-9 px-4 rounded-full bg-[#EAD9FF] text-[#7C3AED] font-semibold text-[13px] hover:opacity-95">
                Upgrade
              </button>

              <button
                aria-label="Notifications"
                className="p-2 rounded-lg flex items-center justify-center text-[#111827] hover:opacity-80"
              >
                <Bell size={18} strokeWidth={2} />
              </button>
              <div ref={helpWrapRef} className="relative">
                <button
                  type="button"
                  aria-label="Help"
                  aria-haspopup="dialog"
                  aria-expanded={helpOpen}
                  onClick={() => setHelpOpen((v) => !v)}
                  className={cx(
                    "p-2 rounded-lg flex items-center justify-center transition-colors",
                    helpOpen
                      ? "text-[#7C3AED]"
                      : "text-[#111827] hover:opacity-80",
                  )}
                >
                  <HelpCircle size={18} strokeWidth={2} />
                </button>

                {helpOpen && (
                  <div
                    role="dialog"
                    aria-label="Help"
                    className="absolute right-0 mt-2 w-[260px] rounded-xl border border-[#E7E1F2] bg-white shadow-lg p-3 text-[13px] text-[#111827]"
                  >
                    <div className="font-semibold">Need help?</div>
                    <div className="text-[#6B7280] mt-1">
                      Email{" "}
                      <a
                        className="text-[#7C3AED] font-semibold hover:underline"
                        href="mailto:taskpilot@yahoo.com"
                      >
                        taskpilot@yahoo.com
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  aria-label="User menu"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 pl-2 border-l border-[#E7E1F2]"
                >
                  <div className="w-9 h-9 rounded-full bg-[#C084FC] border border-[#D9C8FF] flex items-center justify-center font-semibold text-[#151C27]">
                    Z
                  </div>
                  <div className="text-[14px] text-[#9333EA] font-semibold">
                    Zoe Hassan
                  </div>
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    aria-label="User menu"
                    className="absolute right-0 mt-2 w-[200px] rounded-xl border border-[#E7E1F2] bg-white shadow-lg p-2 text-[13px] text-[#111827]"
                  >
                    <a
                      role="menuitem"
                      href="#"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-[#F3F4F6]"
                    >
                      <span className="text-[#6B7280]">
                        <User size={16} strokeWidth={2} />
                      </span>
                      Profile
                    </a>
                    <Link
                      role="menuitem"
                      href="/settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-[#F3F4F6]"
                    >
                      <span className="text-[#6B7280]">
                        <Settings size={16} strokeWidth={2} />
                      </span>
                      Settings
                    </Link>
                    <button
                      type = "button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-[#F3F4F6]">
                      <span className="text-[#6B7280]">
                        <LogOut size={16} strokeWidth={2} />
                      </span>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
      {/* Scrollable page content */}
      <main className={cx("pt-[76px] px-10", contentLeft)}>{children}</main>
    </div>
  );
}
