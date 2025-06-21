'use client';

import {create} from 'zustand';
import {languages} from '@/lib/data';

interface LanguageState {
  targetLanguage: string;
  setTargetLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>(set => ({
  targetLanguage: languages[0].value,
  setTargetLanguage: language => set({targetLanguage: language}),
}));
