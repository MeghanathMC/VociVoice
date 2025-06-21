import type { VocabularySuggestion } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Lightbulb, BookText } from "lucide-react";
import { Badge } from "../ui/badge";

interface VocabularyEnhancementPanelProps {
  suggestions: VocabularySuggestion[];
}

const VocabularyEnhancementPanel = ({
  suggestions,
}: VocabularyEnhancementPanelProps) => {
  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
        <BookText className="h-12 w-12 mb-4" />
        <h3 className="font-semibold">No tips yet!</h3>
        <p className="text-sm">
          As you chat with the AI, vocabulary suggestions will appear here.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {suggestions.map((suggestion, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-accent-foreground flex-shrink-0" />
                    <span>Instead of "{suggestion.originalWord}", try...</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestion.alternativeWords.map((word) => (
                    <Badge key={word} variant="secondary">{word}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {suggestion.explanation}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default VocabularyEnhancementPanel;
