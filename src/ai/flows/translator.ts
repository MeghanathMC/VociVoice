'use server';
/**
 * @fileOverview A flow for translating text and providing explanations.
 *
 * - translateText - A function that handles the translation process.
 * - TranslateTextInput - The input type for the translateText function.
 * - TranslateTextOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  text: z.string().describe('The English text to translate.'),
  targetLanguage: z.string().describe('The language to translate the text into.'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in the target language.'),
  backTranslation: z.string().describe('A literal back-translation of the translated text into English to show how the translation was constructed.'),
  explanation: z.string().describe('A brief explanation of any nuances, cultural context, or interesting grammatical points in the translation.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `You are an expert translator and language teacher. Your task is to translate the user's text from English into {{targetLanguage}}.

In addition to the translation, you must provide two other pieces of information:
1.  **Back-translation**: Provide a literal, word-for-word or phrase-for-phrase back-translation into English. This helps the user understand the structure and vocabulary of the target language.
2.  **Explanation**: Provide a concise explanation of any interesting grammatical nuances, cultural context, or reasons for specific word choices in your translation.

Here is the text to translate:
"{{{text}}}"`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
