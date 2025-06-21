'use server';

/**
 * @fileOverview This file defines a Genkit flow for vocabulary enhancement during a conversation.
 *
 * The flow takes the user's message and the AI's response as input, and provides suggestions for better vocabulary choices.
 *
 * @exports vocabularyEnhancement - The main function to trigger the vocabulary enhancement flow.
 * @exports VocabularyEnhancementInput - The input type for the vocabularyEnhancement function.
 * @exports VocabularyEnhancementOutput - The output type for the vocabularyEnhancement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VocabularyEnhancementInputSchema = z.object({
  userMessage: z.string().describe('The user\'s message in the conversation.'),
  aiResponse: z.string().describe('The AI\'s response in the conversation.'),
  targetLanguage: z.string().describe('The target language for vocabulary enhancement (e.g., Spanish, French).'),
});
export type VocabularyEnhancementInput = z.infer<typeof VocabularyEnhancementInputSchema>;

const VocabularyEnhancementOutputSchema = z.object({
  suggestedVocabulary: z.array(
    z.object({
      originalWord: z.string().describe('The original word used in the conversation.'),
      alternativeWords: z.array(z.string()).describe('Suggested alternative words or phrases.'),
      explanation: z.string().describe('Explanation of why the alternative words are better choices.'),
    })
  ).describe('Suggestions for better vocabulary choices, with explanations.'),
});
export type VocabularyEnhancementOutput = z.infer<typeof VocabularyEnhancementOutputSchema>;

export async function vocabularyEnhancement(input: VocabularyEnhancementInput): Promise<VocabularyEnhancementOutput> {
  return vocabularyEnhancementFlow(input);
}

const vocabularyEnhancementPrompt = ai.definePrompt({
  name: 'vocabularyEnhancementPrompt',
  input: {schema: VocabularyEnhancementInputSchema},
  output: {schema: VocabularyEnhancementOutputSchema},
  prompt: `You are a language learning assistant providing vocabulary suggestions.

  The user is learning {{targetLanguage}}.  Given the user's message and the AI's response, suggest alternative vocabulary choices for the user to improve their language skills.  Provide a list of suggested vocabulary improvements with explanations. Only provide suggestions for the user's message.

  User Message: {{{userMessage}}}
  AI Response: {{{aiResponse}}}

  Format your response as a JSON array of objects. Each object should contain the original word, an array of alternative words, and an explanation.
  `,
});

const vocabularyEnhancementFlow = ai.defineFlow(
  {
    name: 'vocabularyEnhancementFlow',
    inputSchema: VocabularyEnhancementInputSchema,
    outputSchema: VocabularyEnhancementOutputSchema,
  },
  async input => {
    const {output} = await vocabularyEnhancementPrompt(input);
    return output!;
  }
);
