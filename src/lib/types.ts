import type { VocabularyEnhancementOutput } from "@/ai/flows/vocabulary-enhancement";

export interface Scenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  backgroundImage: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export type VocabularySuggestion = VocabularyEnhancementOutput["suggestedVocabulary"][0];

export interface VocabularyItem {
    word: string;
    context: string;
    translation: string;
    definition: string;
    targetLanguage: string;
}
