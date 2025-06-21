"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { progressData } from "@/lib/data";
import { Activity, Clock, Flame, TrendingUp } from "lucide-react";
import { useDailyChallengeStore } from "@/hooks/use-daily-challenge-store";

const ProgressTracker = () => {
  const { streak } = useDailyChallengeStore();

  const stats = [
    {
      title: "Daily Streak",
      value: `${streak} days`,
      icon: Flame,
      color: "text-orange-500",
    },
    {
      title: "Sessions Completed",
      value: progressData.sessions,
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Total Practice",
      value: `${progressData.duration} hrs`,
      icon: Clock,
      color: "text-green-500",
    },
    {
      title: "Fluency Improvement",
      value: `${progressData.improvement}%`,
      icon: TrendingUp,
      color: "text-accent-foreground",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">
        Your Progress
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 text-muted-foreground ${stat.color}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProgressTracker;
