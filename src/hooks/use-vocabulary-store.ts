'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { VocabularyItem } from '@/lib/types';

interface VocabularyState {
  words: VocabularyItem[];
  addWord: (item: VocabularyItem) => boolean; // Returns true if added, false if duplicate
  removeWord: (word: string) => void;
}

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set, get) => ({
      words: [],
      addWord: (item) => {
        const lowerCaseWord = item.word.toLowerCase();
        const isDuplicate = get().words.some(
          (w) => w.word.toLowerCase() === lowerCaseWord
        );
        if (isDuplicate) {
          return false;
        }
        set((state) => ({ words: [item, ...state.words] }));
        return true;
      },
      removeWord: (wordToRemove) => {
        const lowerCaseWordToRemove = wordToRemove.toLowerCase();
        set((state) => ({
          words: state.words.filter(
            (item) => item.word.toLowerCase() !== lowerCaseWordToRemove
          ),
        }));
      },
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
