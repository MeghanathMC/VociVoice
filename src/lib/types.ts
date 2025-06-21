import type { LucideIcon } from "lucide-react";
import type { VocabularyEnhancementOutput } from "@/ai/flows/vocabulary-enhancement";

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  backgroundImage: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export type VocabularySuggestion = VocabularyEnhancementOutput["suggestedVocabulary"][0];
