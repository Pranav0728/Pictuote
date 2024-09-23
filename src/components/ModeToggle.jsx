"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  React.useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className={`h-[1.2rem] w-[1.2rem] ${currentTheme === 'light' ? '' : 'rotate-0 scale-0'}`} />
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] ${currentTheme === 'dark' ? '' : 'rotate-90 scale-0'}`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
