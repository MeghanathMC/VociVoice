
"use client";

import { MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/lib/data";
import { useLanguageStore } from "@/hooks/use-language-store";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";

export function Header() {
  const { targetLanguage, setTargetLanguage } = useLanguageStore();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <MessageSquareHeart className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">VociVoice</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: pathname === "/" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/translator"
              className={cn(
                buttonVariants({
                  variant: pathname === "/translator" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              Translator
            </Link>
            <Link
              href="/vocabulary"
              className={cn(
                buttonVariants({
                  variant: pathname === "/vocabulary" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              Vocabulary
            </Link>
             <Link
              href="/profile"
              className={cn(
                buttonVariants({
                  variant: pathname === "/profile" ? "secondary" : "ghost",
                  size: "sm",
                })
              )}
            >
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
