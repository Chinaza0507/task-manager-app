import DashboardShell from "@/components/DashboardShell";

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
