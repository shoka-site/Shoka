"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry so we're immediately alerted about admin-panel errors.
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred in the admin panel. The error has been
            reported automatically.
          </p>
          {process.env.NODE_ENV === "development" && error.message && (
            <pre className="mt-4 text-left text-xs bg-muted p-4 rounded-lg overflow-auto text-destructive">
              {error.message}
              {error.digest ? `\nDigest: ${error.digest}` : ""}
            </pre>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={reset} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
          <Button asChild>
            <a href="/admin/dashboard" className="gap-2 flex items-center">
              <LayoutDashboard className="w-4 h-4" />
              Back to Dashboard
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
