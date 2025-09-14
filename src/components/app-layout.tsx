import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <main className="flex-1">
          <SidebarInset>
            {children}
          </SidebarInset>
        </main>
      </div>
    </SidebarProvider>
  );
}
