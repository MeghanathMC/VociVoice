"use client";

import { useVocabularyStore } from "@/hooks/use-vocabulary-store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, BookText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

export default function VocabularyList() {
    const { words, removeWord } = useVocabularyStore();

    if (words.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-16 text-center text-muted-foreground">
                <BookText className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Your Vocabulary List is Empty</h3>
                <p className="text-sm">
                    Go to a chat scenario and click on words from the AI tutor to save them here.
                </p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Saved Words</CardTitle>
                <CardDescription>
                    Here are the words you've saved. Click on any word to see more details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {words.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={`${item.word}-${index}`}>
                            <AccordionTrigger>
                                <div className="flex justify-between items-center w-full pr-4">
                                    <span className="text-lg font-medium text-primary">{item.word}</span>
                                    <span className="text-sm text-muted-foreground">{item.translation}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-foreground">Definition</h4>
                                    <p className="text-muted-foreground">{item.definition}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Original Context</h4>
                                    <p className="text-muted-foreground italic">"{item.context}"</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <Badge variant="secondary">{item.targetLanguage}</Badge>
                                    <Button variant="ghost" size="sm" onClick={() => removeWord(item.word)}>
                                        <Trash2 className="mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}
