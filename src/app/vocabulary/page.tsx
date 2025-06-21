"use client";

import VocabularyList from "@/components/vocabulary/vocabulary-list";
import FlashcardPractice from "@/components/vocabulary/flashcard-practice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, BrainCircuit, NotebookText } from "lucide-react";
import { useVocabularyStore } from "@/hooks/use-vocabulary-store";

export default function VocabularyPage() {
    const { words } = useVocabularyStore();

    return (
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center gap-3">
                    <NotebookText className="h-8 w-8 text-primary" />
                    My Vocabulary
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Review your saved words and practice with flashcards.
                </p>
            </header>

            <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">
                        <BookMarked className="mr-2" />
                        Word List ({words.length})
                    </TabsTrigger>
                    <TabsTrigger value="practice">
                        <BrainCircuit className="mr-2" />
                        Practice
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-6">
                    <VocabularyList />
                </TabsContent>
                <TabsContent value="practice" className="mt-6">
                    <FlashcardPractice />
                </TabsContent>
            </Tabs>
        </div>
    );
}
