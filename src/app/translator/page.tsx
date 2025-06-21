"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguageStore } from "@/hooks/use-language-store";
import { getTranslation, getAudioForText } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { TranslateTextOutput } from "@/ai/flows/translator";
import { ArrowRight, BookOpen, Repeat, Languages, Volume2, Loader2, Mic } from "lucide-react";

// SpeechRecognition type might not be available in global scope for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function TranslatorPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslateTextOutput | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { targetLanguage } = useLanguageStore();
  const { toast } = useToast();

  useEffect(() => {
    if (audioSrc && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioSrc]);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => (prev ? prev.trim() + " " + transcript : transcript));
      };

      recognition.onerror = (event: any) => {
        toast({
          variant: "destructive",
          title: "Speech Recognition Error",
          description: `An error occurred: ${event.error}`,
        });
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Browser Not Supported",
        description: "Your browser does not support speech recognition.",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResult(null);
    setAudioSrc(null);

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

  const handleListen = async () => {
    if (!result?.translatedText) return;

    setIsAudioLoading(true);
    const response = await getAudioForText({ text: result.translatedText });
    if (response.success && response.data) {
      setAudioSrc(response.data.audioDataUri);
    } else {
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: response.error,
      });
    }
    setIsAudioLoading(false);
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
              <div className="relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isRecording ? "Listening..." : "Enter text in English to translate, or use the microphone..."}
                  rows={5}
                  disabled={isLoading || isRecording}
                  className="pr-12"
                />
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "ghost"}
                  size="icon"
                  onClick={handleMicClick}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button type="submit" disabled={isLoading || isRecording || !inputValue.trim()} className="self-start">
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
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages /> Translation
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleListen}
                    disabled={isAudioLoading || !result.translatedText}
                  >
                    {isAudioLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
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
      {audioSrc && <audio ref={audioRef} src={audioSrc} className="hidden" />}
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
