import DashboardShell from "@/components/DashboardShell";

export default function TaskListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
