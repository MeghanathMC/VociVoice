"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isSameDay, isYesterday } from "date-fns";

interface DailyChallengeState {
  streak: number;
  lastCompletedDate: string | null;
  completeDailyChallenge: () => void;
}

export const useDailyChallengeStore = create<DailyChallengeState>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastCompletedDate: null,
      completeDailyChallenge: () => {
        const { lastCompletedDate, streak } = get();
        const today = new Date();

        if (
          lastCompletedDate &&
          isSameDay(new Date(lastCompletedDate), today)
        ) {
          // Already completed today, do nothing.
          return;
        }

        let newStreak = 1;
        if (
          lastCompletedDate &&
          isYesterday(new Date(lastCompletedDate))
        ) {
          // Completed yesterday, continue the streak.
          newStreak = streak + 1;
        }

        set({
          streak: newStreak,
          lastCompletedDate: today.toISOString(),
        });
      },
    }),
    {
      name: "daily-challenge-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
