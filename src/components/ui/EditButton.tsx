import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "react-router";

type EditButtonProps = {
  link: string;
  size?: "default" | "sm" | "lg";
};

export const EditButton = ({ link, size = "default" }: EditButtonProps) => {
  return (
    <Button variant="outline" size={size} className="p-3" asChild>
      <Link to={link}>
        <span className="hidden sm:inline">Edit</span>
        <Pencil className="sm:hidden" />
      </Link>
    </Button>
  );
};
