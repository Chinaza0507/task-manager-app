import DashboardShell from "@/components/DashboardShell";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
