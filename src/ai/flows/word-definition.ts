'use server';

/**
 * @fileOverview A Genkit flow for defining a word in context.
 *
 * This flow takes a word, its surrounding context, and a target language.
 * It returns the English translation and a simple definition of the word.
 *
 * @exports getWordDefinition
 * @exports WordDefinitionInput
 * @exports WordDefinitionOutput
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WordDefinitionInputSchema = z.object({
  word: z.string().describe('The word to be defined.'),
  context: z
    .string()
    .describe('The full sentence or phrase where the word appeared.'),
  targetLanguage: z.string().describe('The language of the word and context.'),
});
export type WordDefinitionInput = z.infer<typeof WordDefinitionInputSchema>;

const WordDefinitionOutputSchema = z.object({
  translation: z
    .string()
    .describe('The most likely English translation of the word in this context.'),
  definition: z
    .string()
    .describe('A simple English definition of the word.'),
});
export type WordDefinitionOutput = z.infer<typeof WordDefinitionOutputSchema>;

export async function getWordDefinition(input: WordDefinitionInput): Promise<WordDefinitionOutput> {
  return wordDefinitionFlow(input);
}

const wordDefinitionPrompt = ai.definePrompt({
  name: 'wordDefinitionPrompt',
  input: { schema: WordDefinitionInputSchema },
  output: { schema: WordDefinitionOutputSchema },
  prompt: `You are a helpful language assistant. A user is learning {{targetLanguage}} and wants to understand a specific word from a sentence.

Analyze the word "{{word}}" within the context of the following sentence: "{{context}}".

Based on this context, provide:
1.  A direct English translation for "{{word}}".
2.  A simple, one-sentence definition in English explaining what "{{word}}" means in this context.`,
});

const wordDefinitionFlow = ai.defineFlow(
  {
    name: 'wordDefinitionFlow',
    inputSchema: WordDefinitionInputSchema,
    outputSchema: WordDefinitionOutputSchema,
  },
  async (input) => {
    const { output } = await wordDefinitionPrompt(input);
    return output!;
  }
);
