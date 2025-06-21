"use client";

import { useState, useEffect } from "react";
import { useVocabularyStore } from "@/hooks/use-vocabulary-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowLeft, ArrowRight, BrainCircuit, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FlashcardPractice() {
    const { words } = useVocabularyStore();
    const [shuffledWords, setShuffledWords] = useState([...words]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    
    useEffect(() => {
        setShuffledWords([...words].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [words]);

    const handleShuffle = () => {
        setShuffledWords([...words].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    if (words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-16 text-center text-muted-foreground">
                <BrainCircuit className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Nothing to Practice</h3>
                <p className="text-sm">
                    Save at least one word to your vocabulary list to start a practice session.
                </p>
            </div>
        );
    }
    
    const currentWord = shuffledWords[currentIndex];

    const goToNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledWords.length);
        }, 150);
    };

    const goToPrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + shuffledWords.length) % shuffledWords.length);
        }, 150);
    };


    return (
        <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-md h-64 [perspective:1000px]">
                <div
                    className={cn("relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500", isFlipped && "[transform:rotateY(180deg)]")}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <Card className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                        <CardContent className="p-6 text-center">
                            <p className="text-sm text-muted-foreground">{currentWord.targetLanguage}</p>
                            <p className="text-4xl font-bold font-headline text-primary">{currentWord.word}</p>
                        </CardContent>
                    </Card>

                    <Card className="absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <CardContent className="p-6 text-center space-y-2">
                           <div>
                                <p className="text-sm text-muted-foreground">Translation</p>
                                <p className="text-2xl font-semibold text-foreground">{currentWord.translation}</p>
                           </div>
                           <div>
                                <p className="text-sm text-muted-foreground">Definition</p>
                                <p className="text-sm text-foreground">{currentWord.definition}</p>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="text-center text-muted-foreground">
                Card {currentIndex + 1} of {shuffledWords.length}
            </div>

            <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={goToPrev}>
                    <ArrowLeft />
                </Button>
                <Button variant="default" size="lg" onClick={() => setIsFlipped(!isFlipped)}>
                    <RotateCcw className="mr-2" />
                    Flip Card
                </Button>
                <Button variant="outline" size="icon" onClick={goToNext}>
                    <ArrowRight />
                </Button>
            </div>
            
            <Button variant="ghost" onClick={handleShuffle}>
                <Shuffle className="mr-2"/>
                Shuffle Deck
            </Button>
        </div>
    );
}
