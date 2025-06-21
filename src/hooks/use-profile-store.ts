
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProfileState {
  name: string;
  nativeLanguage: string;
  profileImageSrc: string | null;
  setName: (name: string) => void;
  setNativeLanguage: (language: string) => void;
  setProfileImageSrc: (src: string | null) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: 'Alex',
      nativeLanguage: 'english',
      profileImageSrc: null,
      setName: (name) => set({ name }),
      setNativeLanguage: (language) => set({ nativeLanguage: language }),
      setProfileImageSrc: (src) => set({ profileImageSrc: src }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
