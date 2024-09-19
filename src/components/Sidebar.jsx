"use client";
import React from "react";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { PiSelectionBackground } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import { Menu, Package2, Home, LineChart, ChartColumnDecreasing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Header() {
    const pathname = usePathname()

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed">
      {/* Sidebar */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Pictuote</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/general"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === "/general"
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Home className="h-4 w-4" />
                General
              </Link>
              <Link
                href="/category"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === "/category"
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <PiSelectionBackground className="h-4 w-4" />
                Background Category
              </Link>
              <Link
                href="/author"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === "/author"
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <IoPerson className="h-4 w-4" />
                Author Category
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content and Header */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Pictuote</span>
                </Link>
                <Link
                  href="/general"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    pathname === "/general"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  General
                </Link>
                <Link
                  href="/category"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    pathname === "/category"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  Background Category
                </Link>
                <Link
                  href="/author"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    pathname === "/author"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ChartColumnDecreasing className="h-4 w-4" />
                  Author Category
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}

export default Header;
