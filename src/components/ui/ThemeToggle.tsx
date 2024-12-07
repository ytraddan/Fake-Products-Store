import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" color="white" />
      ) : (
        <Moon className="h-5 w-5" color="black" />
      )}
    </Button>
  );
}
