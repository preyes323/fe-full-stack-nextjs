import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen candy-mesh p-6">
      <GlassPane className="w-full h-full flex align-center p-6 container mx-auto">
        <Sidebar />
        <main className="w-full pl-6 h-full">{children}</main>
      </GlassPane>
    </div>
  );
}
