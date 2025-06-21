"use client";

import { useState } from "react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { getTranslation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { TranslateTextOutput } from "@/ai/flows/translator";
import { ArrowRight, BookOpen, Repeat, Languages } from "lucide-react";

export default function TranslatorPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslateTextOutput | null>(null);
  const { targetLanguage } = useLanguageStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResult(null);

    const response = await getTranslation({
      text: inputValue,
      targetLanguage,
    });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Translation Error",
        description: response.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Translator
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Translate from English to your target language and get detailed explanations.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Text</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text in English to translate..."
                rows={5}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !inputValue.trim()} className="self-start">
                {isLoading ? "Translating..." : "Translate"}
                {!isLoading && <ArrowRight className="ml-2" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && <TranslationSkeleton />}

        {result && (
          <div className="flex flex-col gap-6">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages /> Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-foreground">{result.translatedText}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Repeat /> Back-Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{result.backTranslation}"</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen /> Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{result.explanation}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

const TranslationSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-full" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  </div>
);
