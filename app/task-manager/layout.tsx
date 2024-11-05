import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/page-components/app-sidebar-task";
import React, { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
  
