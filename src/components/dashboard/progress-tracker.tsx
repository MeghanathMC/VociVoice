"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { progressData } from "@/lib/data";
import { Activity, Clock, Flame, TrendingUp } from "lucide-react";
import { useDailyChallengeStore } from "@/hooks/use-daily-challenge-store";
import { cn } from "@/lib/utils";

const ProgressTracker = () => {
  const { streak } = useDailyChallengeStore();

  const stats = [
    {
      title: "Daily Streak",
      value: `${streak} days`,
      icon: Flame,
      color: "bg-orange-100 text-orange-500",
      darkColor: "dark:bg-orange-900/50 dark:text-orange-400",
    },
    {
      title: "Sessions Completed",
      value: progressData.sessions,
      icon: Activity,
      color: "bg-primary/10 text-primary",
      darkColor: "dark:bg-primary/20",
    },
    {
      title: "Total Practice",
      value: `${progressData.duration} hrs`,
      icon: Clock,
      color: "bg-green-100 text-green-600",
      darkColor: "dark:bg-green-900/50 dark:text-green-400",
    },
    {
      title: "Fluency Improvement",
      value: `${progressData.improvement}%`,
      icon: TrendingUp,
      color: "bg-accent/20 text-accent-foreground",
      darkColor: "dark:bg-accent/20 dark:text-yellow-400",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">
        Your Progress
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-full",
                    stat.color,
                    stat.darkColor
                  )}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProgressTracker;
