"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { CyberMindLogo } from "@/components/icons";
import {
  Shield,
  MailWarning,
  CreditCard,
  GitBranch,
  Settings,
} from "lucide-react";
import { Separator } from "./ui/separator";

const links = [
  { href: "/", label: "Dashboard", icon: Shield },
  { href: "/phishing", label: "Phishing Analysis", icon: MailWarning },
  { href: "/fraud", label: "Fraud Detection", icon: CreditCard },
  {
    href: "/threat-intelligence",
    label: "Threat Intelligence",
    icon: GitBranch,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <CyberMindLogo className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold text-primary">
              CyberMind
            </h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                className="w-full justify-start"
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/settings"}
              className="w-full justify-start"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
