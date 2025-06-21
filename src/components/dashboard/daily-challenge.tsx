"use client";

import type { Scenario } from "@/lib/types";
import { useDailyChallengeStore } from "@/hooks/use-daily-challenge-store";
import ScenarioCard from "./scenario-card";
import { Flame } from "lucide-react";

interface DailyChallengeProps {
  scenario: Scenario;
}

export default function DailyChallenge({ scenario }: DailyChallengeProps) {
  const { streak } = useDailyChallengeStore();

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">
          Daily Challenge
        </h2>
        <div className="flex items-center gap-2 text-lg font-bold text-orange-500">
          <Flame className="h-6 w-6" />
          <span>{streak} Day Streak</span>
        </div>
      </div>
      <div className="rounded-xl p-1 shadow-lg bg-gradient-to-br from-accent via-primary/70 to-primary">
        <ScenarioCard scenario={scenario} />
      </div>
    </section>
  );
}
