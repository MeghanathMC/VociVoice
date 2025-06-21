"use client";

import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./message-bubble";
import { type Scenario, type ChatMessage, type VocabularySuggestion } from "@/lib/types";
import { getAiTutorResponse, getVocabularyEnhancement } from "@/lib/actions";
import { Send, Sparkles } from "lucide-react";
import SoundwaveLoader from "./soundwave-loader";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VocabularyEnhancementPanel from "./vocabulary-enhancement-panel";
import { iconMap } from "@/lib/icons";
import { useLanguageStore } from "@/hooks/use-language-store";
import { useDailyChallengeStore } from "@/hooks/use-daily-challenge-store";

interface ChatInterfaceProps {
  scenario: Scenario;
  isDailyChallenge?: boolean;
}

export default function ChatInterface({ scenario, isDailyChallenge = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularySuggestions, setVocabularySuggestions] = useState<
    VocabularySuggestion[]
  >([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { targetLanguage } = useLanguageStore();
  const { completeDailyChallenge } = useDailyChallengeStore();
  const [isChallengeCompletedThisSession, setIsChallengeCompletedThisSession] = useState(false);

  const Icon = iconMap[scenario.icon];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Initial AI message
    const initialMessage: ChatMessage = {
      role: 'ai',
      content: `Welcome! You are at the ${scenario.name.toLowerCase()}. Let's practice. You can start the conversation.`,
    };
    setMessages([initialMessage]);
  }, [scenario.name]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const aiResponseResult = await getAiTutorResponse({
      scenario: scenario.name,
      language: targetLanguage,
      userMessage: inputValue,
    });

    if (aiResponseResult.success && aiResponseResult.data) {
      const aiMessage: ChatMessage = {
        role: "ai",
        content: aiResponseResult.data.aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (isDailyChallenge && !isChallengeCompletedThisSession) {
        completeDailyChallenge();
        setIsChallengeCompletedThisSession(true);
        toast({
            title: "Daily Challenge Complete!",
            description: "You've completed your challenge for today. Keep the streak going!",
        });
      }

      const vocabResult = await getVocabularyEnhancement({
        userMessage: userMessage.content,
        aiResponse: aiMessage.content,
        targetLanguage: targetLanguage,
      });

      if (vocabResult.success && vocabResult.data) {
        setVocabularySuggestions(prev => [...prev, ...vocabResult.data.suggestedVocabulary]);
      } else {
        toast({
          variant: "destructive",
          title: "Vocabulary Error",
          description: vocabResult.error,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: aiResponseResult.error,
      });
      // Restore user input on error
      setInputValue(userMessage.content);
      setMessages(prev => prev.slice(0, -1));
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full h-[calc(100vh-120px)] flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            {Icon && <Icon className="h-6 w-6 text-primary" />}
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">
              {scenario.name}
            </CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Tabs defaultValue="conversation" className="flex-grow flex flex-col overflow-hidden">
        <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="vocabulary">
                    <Sparkles className="mr-2 h-4 w-4" /> Vocabulary Tips
                </TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="conversation" className="flex-grow flex flex-col overflow-hidden mt-0">
             <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                <div className="space-y-4 pr-4">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
                {isLoading && <SoundwaveLoader />}
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-grow"
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon">
                    <Send className="h-4 w-4" />
                </Button>
                </form>
            </div>
        </TabsContent>
        <TabsContent value="vocabulary" className="flex-grow overflow-hidden mt-0">
            <VocabularyEnhancementPanel suggestions={vocabularySuggestions} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
