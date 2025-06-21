import { scenarios } from "@/lib/data";
import ScenarioCard from "./scenario-card";

const ScenarioSelection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">
        Choose a Scenario
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </section>
  );
};

export default ScenarioSelection;
