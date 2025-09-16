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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CyberMindLogo } from "@/components/icons";
import {
  Shield,
  MailWarning,
  CreditCard,
  GitBranch,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground px-2"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                <span>Admin User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2 ml-2" side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  toast({
                    title: "Coming Soon!",
                    description: "Logout functionality is not yet implemented.",
                  })
                }
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
