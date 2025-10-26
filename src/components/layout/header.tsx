"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, Rocket } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePayment } from "@/hooks/usePayment";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { processPayment, isLoading } = usePayment();
  const { toast } = useToast();

  const handleGoLive = async () => {
    const result = await processPayment({ amount: 9.99, userId: "demo" });
    if (result.success) {
      toast({
        title: "Features Unlocked! 🎉",
        description: "Premium features are now available.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold hidden sm:block">Creative Workspace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            onClick={handleGoLive}
            disabled={isLoading}
            size="sm"
            className="gap-2"
          >
            <Rocket className="h-4 w-4" />
            {isLoading ? "Processing..." : "Go Live"}
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Log in
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/features" className="text-base font-medium">Features</Link>
                <Link href="/pricing" className="text-base font-medium">Pricing</Link>
                <Link href="/docs" className="text-base font-medium">Docs</Link>
                <div className="border-t pt-4 mt-4">
                  <Button variant="ghost" className="w-full justify-start mb-2">Log in</Button>
                  <Button className="w-full" onClick={handleGoLive}>Go Live</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
