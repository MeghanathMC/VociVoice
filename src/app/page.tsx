import ProgressTracker from "@/components/dashboard/progress-tracker";
import ScenarioSelection from "@/components/dashboard/scenario-selection";

export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back! Choose a scenario to start practicing or track your
            progress.
          </p>
        </header>

        <ProgressTracker />
        <ScenarioSelection />
      </div>
    </div>
  );
}
