import { Button } from "./button";
import { X } from "lucide-react";

interface ClearButtonProps {
  onClick: () => void;
}

export function ClearButton({ onClick }: ClearButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute right-2 top-1/2 h-6 -translate-y-1/2 px-1 text-zinc-900 dark:text-white"
      onClick={onClick}
    >
      <X fill="currentColor" />
    </Button>
  );
}
