"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: PropsWithChildren<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <div className="py-8 sm:p-16">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          {error.message || "An unexpected error occurred"}
        </AlertDescription>
      </Alert>
    </div>
  );
}
