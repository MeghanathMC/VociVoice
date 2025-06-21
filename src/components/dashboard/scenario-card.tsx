import type { Scenario } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { iconMap } from "@/lib/icons";

interface ScenarioCardProps {
  scenario: Scenario;
}

const ScenarioCard = ({ scenario }: ScenarioCardProps) => {
  const Icon = iconMap[scenario.icon];
  return (
    <Link href={`/chat/${scenario.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary">
        <div className="relative h-40 w-full">
            <Image 
                src={`https://placehold.co/600x400.png`} 
                alt={scenario.name} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={scenario.backgroundImage}
                className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                {Icon && <Icon className="h-6 w-6 text-primary" />}
              </div>
              <CardTitle className="font-headline">{scenario.name}</CardTitle>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <CardDescription className="pt-2">{scenario.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ScenarioCard;
