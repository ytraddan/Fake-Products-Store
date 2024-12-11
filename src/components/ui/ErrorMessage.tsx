import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  title: string;
  message: string;
}

export const ErrorMessage = ({ title, message }: ErrorMessageProps) => {
  return (
    <div className="container mx-auto mt-20 flex max-w-2xl p-4">
      <Card className="mx-auto w-full">
        <CardContent className="p-6">
          <h2 className="mb-2 text-2xl font-bold text-red-300">{title}</h2>
          <p className="text-md text-gray-500">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
};
