import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
  onClick: () => void;
  size?: "default" | "sm" | "lg";
};

export const DeleteButton = ({
  onClick,
  size = "default",
}: DeleteButtonProps) => {
  return (
    <Button variant="outline" size={size} className="p-3" onClick={onClick}>
      <span className="hidden sm:inline">Delete</span>
      <Trash2 className="sm:hidden" />
    </Button>
  );
};
