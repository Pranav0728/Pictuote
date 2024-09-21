"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, X } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import { useRef } from "react"; // Using useRef to manage Drawer state

export default function HomeHeader({ className }) {
  const pathname = usePathname();
  // const drawerRef = useRef(null); // Ref to manage Drawer

  const items = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: `/services`,
      title: "Services",
    },
    {
      href: `/contact`,
      title: "Contact",
    },
  ];

  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <Image
        alt="logo"
        src="/image/logo.png"
        className="mr-3"
        width={50}
        height={50}
        priority
      />
    </Link>
  );

  const getAuthButtons = () => (
    <>
      <div className="flex gap-3 items-center mx-2"></div>
      <ModeToggle />
    </>
  );

  const getHeaderItems = () => {
    return (
      <>
        {items.map((item) => {
          // Check for exact match on the Home route and partial match for other routes
          const isHomePage = item.href === "/" && pathname === "/";
          const isOtherPage = item.href !== "/" && pathname.includes(item.href);
          const selected = isHomePage || isOtherPage;

          return (
            <Link href={item.href} key={item.title} passHref>
              <p
                className={cn(
                  selected ? " font-bold cursor-pointer" : " cursor-pointer"
                )}
              >
                {item.title}
              </p>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        `flex md:h-12 h-14 items-center justify-center w-full border-b`,
        className
      )}
    >
      <div className="w-full max-w-[1000px] md:px-8 px-4">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className="md:flex-0 min-w-fit flex-1">{getLogo()}</div>
          <div className="hidden md:flex  items-center w-full justify-between">
            <div className="flex items-center gap-x-8 flex-1">
              {getHeaderItems()}
            </div>
            {getAuthButtons()}
          </div>
          {/* Mobile */}
          <div className="md:hidden flex gap-x-4 items-center">
            {getAuthButtons()}
            {/* Ref to manage Drawer */}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                {/* Wrapping MenuIcon in a button */}
                <button>
                  <MenuIcon />
                </button>
              </DrawerTrigger>
              <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <div className="mx-auto w-full p-5">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      {/* Wrapping X icon in a button */}
                      <button className="w-full flex items-end justify-end">
                        <X />
                      </button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">{getHeaderItems()}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
