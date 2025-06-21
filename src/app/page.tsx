"use client";

import { useState, useEffect, useMemo } from "react";
import DailyChallenge from "@/components/dashboard/daily-challenge";
import ProgressTracker from "@/components/dashboard/progress-tracker";
import ScenarioSelection from "@/components/dashboard/scenario-selection";
import { scenarios } from "@/lib/data";
import { useProfileStore } from "@/hooks/use-profile-store";
import { Skeleton } from "@/components/ui/skeleton";

const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export default function Home() {
  const { name } = useProfileStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dailyChallengeScenario = useMemo(() => {
    if (!isClient) {
      return null;
    }
    const dayOfYear = getDayOfYear(new Date());
    return scenarios[dayOfYear % scenarios.length];
  }, [isClient]);

  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-12">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Welcome back, {name}!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Ready to continue your journey? Tackle today's challenge to build your streak, or practice freely in any scenario.
          </p>
        </header>

        {dailyChallengeScenario ? (
          <DailyChallenge scenario={dailyChallengeScenario} />
        ) : (
          <section>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-[125px] w-full rounded-xl" />
          </section>
        )}
        <ProgressTracker />
        <ScenarioSelection />
      </div>
    </div>
  );
}
