"use server";

import {
  aiTutorConversation,
  type AiTutorConversationInput,
} from "@/ai/flows/ai-tutor";
import {
  vocabularyEnhancement,
  type VocabularyEnhancementInput,
} from "@/ai/flows/vocabulary-enhancement";
import {
  translateText,
  type TranslateTextInput,
} from "@/ai/flows/translator";
import { 
  getWordDefinition,
  type WordDefinitionInput
} from "@/ai/flows/word-definition";

export async function getWordDefinitionAction(input: WordDefinitionInput) {
  "use server";
  try {
    const response = await getWordDefinition(input);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getWordDefinitionAction:", error);
    return {
      success: false,
      error: "An error occurred while defining the word.",
    };
  }
}

export async function getAiTutorResponse(input: AiTutorConversationInput) {
  "use server";
  try {
    const response = await aiTutorConversation(input);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getAiTutorResponse:", error);
    return {
      success: false,
      error: "An error occurred while communicating with the AI.",
    };
  }
}

export async function getVocabularyEnhancement(
  input: VocabularyEnhancementInput
) {
  "use server";
  try {
    const response = await vocabularyEnhancement(input);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getVocabularyEnhancement:", error);
    return {
      success: false,
      error: "An error occurred while fetching vocabulary suggestions.",
    };
  }
}

export async function getTranslation(input: TranslateTextInput) {
  "use server";
  try {
    const response = await translateText(input);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error in getTranslation:", error);
    return {
      success: false,
      error: "An error occurred while translating the text.",
    };
  }
}
