"use client";

import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface FooterProps {
  isSaved: boolean;
  lastSaved?: string;
}

export default function Footer({ isSaved, lastSaved }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-12 items-center justify-between px-6 text-sm">
        <div className="flex items-center gap-3">
          {isSaved ? (
            <>
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">
                {lastSaved ? `Saved ${formatDate(lastSaved)}` : "All changes saved"}
              </span>
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />
              <span className="text-muted-foreground">Saving...</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition">
            Terms
          </Link>
          <span className="text-muted-foreground">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
