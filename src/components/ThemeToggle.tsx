import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface ThemeToggleProps {
  onToggle?: () => void;
  isDarkMode?: boolean;
}

const ThemeToggle = ({
  onToggle = () => {},
  isDarkMode = false,
}: ThemeToggleProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;
