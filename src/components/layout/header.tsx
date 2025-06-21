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

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MessageSquareHeart className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">Talki AI</span>
        </Link>
        <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-muted-foreground hidden sm:block">Target Language:</p>
            <Select defaultValue={languages[0].value}>
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
      </div>
    </header>
  );
}
