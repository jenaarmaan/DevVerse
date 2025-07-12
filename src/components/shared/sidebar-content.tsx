
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarClose } from "@/components/ui/sidebar";
import { navConfig, type NavItem as NavItemType } from "@/lib/nav-config";
import { CodeSquare } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

export function SidebarContent() {
  const mainNav = navConfig.filter(cat => cat.title !== "General");
  const generalNav = navConfig.find(cat => cat.title === "General");

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex flex-1 items-center justify-center gap-2 font-bold z-[60]">
          <CodeSquare className="w-7 h-7 text-primary" />
          <span className="text-lg font-headline">DevVerse</span>
        </Link>
        <SidebarClose className="absolute right-3" />
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-visible p-2">
        <ul className="space-y-1">
          {mainNav.map((category, categoryIndex) => (
            <React.Fragment key={category.title}>
              <li className="px-3 pt-4 pb-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">
                {category.title}
              </li>
              {category.items.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
              {categoryIndex < mainNav.length - 1 && (
                <li className="px-2 py-2">
                  <Separator className="bg-sidebar-border/60" />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
      
      {generalNav && (
        <div className="mt-auto border-t border-sidebar-border/60 p-2">
            <ul className="space-y-1">
                {generalNav.items.map((item) => (
                    <NavItem key={item.title} item={item} />
                ))}
            </ul>
        </div>
      )}
    </div>
  );
}

function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  
  const isActive = hasSubItems
    ? item.href ? pathname.startsWith(item.href) : item.subItems?.some(sub => pathname.startsWith(sub.href))
    : pathname === item.href;

  return (
    <li className="group/menu-item relative z-[60]">
      <Link
        href={item.href ?? "#"}
        data-active={isActive}
        className={cn(
          "relative flex w-full items-center gap-3 overflow-hidden rounded-md p-3 text-left text-sm outline-none ring-ring transition-colors bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-sidebar-accent-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:transition-transform before:scale-y-0 data-[active=true]:before:scale-y-100"
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <span className="truncate">{item.title}</span>
      </Link>
      
      {hasSubItems && (
        <div className="absolute left-full top-0 z-[60] ml-2 hidden w-56 min-w-max rounded-lg bg-card p-2 shadow-lg animate-in fade-in-0 duration-200 group-hover/menu-item:block">
          <ul className="space-y-1">
            {item.subItems?.map((subItem) => {
              const LinkComponent = subItem.external ? 'a' : Link;
              const linkProps = subItem.external 
                ? { href: subItem.href, target: "_blank", rel: "noopener noreferrer" } 
                : { href: subItem.href };

              return (
                <li key={subItem.title}>
                  <LinkComponent
                    {...linkProps}
                    className={cn(
                        "flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-accent focus:bg-accent",
                        !subItem.external && pathname === subItem.href && "font-semibold text-primary"
                    )}
                  >
                    {subItem.title}
                  </LinkComponent>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
