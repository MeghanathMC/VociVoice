import DailyChallenge from "@/components/dashboard/daily-challenge";
import ProgressTracker from "@/components/dashboard/progress-tracker";
import ScenarioSelection from "@/components/dashboard/scenario-selection";
import { scenarios } from "@/lib/data";

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
  const dayOfYear = getDayOfYear(new Date());
  const dailyChallengeScenario = scenarios[dayOfYear % scenarios.length];

  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back! Tackle your daily challenge or choose another
            scenario.
          </p>
        </header>

        <DailyChallenge scenario={dailyChallengeScenario} />
        <ProgressTracker />
        <ScenarioSelection />
      </div>
    </div>
  );
}
