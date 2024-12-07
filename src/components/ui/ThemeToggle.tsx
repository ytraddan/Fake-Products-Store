import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="max-h-10 cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="size-6" color="white" />
      ) : (
        <Moon className="size-6" color="black" />
      )}
    </div>
  );
}
