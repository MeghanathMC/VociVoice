
"use client";

import { useState } from "react";
import { Menu, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { languages } from "@/lib/data";
import { useLanguageStore } from "@/hooks/use-language-store";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/translator", label: "Translator" },
  { href: "/vocabulary", label: "Vocabulary" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const { targetLanguage, setTargetLanguage } = useLanguageStore();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => isSheetOpen && setIsSheetOpen(false)}>
            <MessageSquareHeart className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">VociVoice</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: pathname === link.href ? "secondary" : "ghost",
                    size: "sm",
                  })
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Language Selector */}
          <div className="hidden sm:flex items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Target Language:
            </p>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <UserNav />
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-start border-b pb-4">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                      <MessageSquareHeart className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline text-lg">VociVoice</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-2 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={`mobile-${link.href}`}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className={cn(
                          buttonVariants({
                            variant: pathname === link.href ? "secondary" : "ghost",
                            size: "lg",
                          }),
                          "justify-start text-base"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Target Language
                    </p>
                    <Select value={targetLanguage} onValueChange={(value) => {
                      setTargetLanguage(value);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
