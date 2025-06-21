"use client";

import { useState, useRef, useEffect } from "react";
import { type ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Volume2, Loader2 } from "lucide-react";
import { useVocabularyStore } from "@/hooks/use-vocabulary-store";
import { useLanguageStore } from "@/hooks/use-language-store";
import { getWordDefinitionAction, getAudioForText } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [loadingWord, setLoadingWord] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isUser = message.role === "user";
  const { addWord } = useVocabularyStore();
  const { targetLanguage } = useLanguageStore();
  const { toast } = useToast();

  const handleWordClick = async (word: string, index: number) => {
    const cleanedWord = word.replace(/[.,!?;:"]/g, "");
    if (!cleanedWord || !isNaN(Number(cleanedWord))) {
        return;
    }

    const uniqueKey = `${cleanedWord}-${index}`;
    setLoadingWord(uniqueKey);

    const result = await getWordDefinitionAction({
        word: cleanedWord,
        context: message.content,
        targetLanguage,
    });

    if (result.success && result.data) {
        const wasAdded = addWord({
            word: cleanedWord,
            context: message.content,
            translation: result.data.translation,
            definition: result.data.definition,
            targetLanguage,
        });

        if (wasAdded) {
            toast({
                title: "Saved!",
                description: `"${cleanedWord}" has been added to your vocabulary.`,
            });
        } else {
            toast({
                variant: "default",
                title: "Already Saved",
                description: `"${cleanedWord}" is already in your vocabulary list.`,
            });
        }

    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }

    setLoadingWord(null);
  };
  
  const handleListen = async () => {
    if (isUser || !message.content) return;

    setIsAudioLoading(true);
    setAudioSrc(null);
    const response = await getAudioForText({ text: message.content });

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
  
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
  }, [audioSrc]);


  const renderContent = () => {
    if (isUser) {
        return <p className="text-sm">{message.content}</p>;
    }

    return (
      <p className="text-sm">
        {message.content.split(/(\s+)/).map((segment, index) => {
          if (segment.trim() === '') {
            return <span key={index}>{segment}</span>;
          }
          const uniqueKey = `${segment.replace(/[.,!?;:"]/g, "")}-${index}`;
          const isLoading = loadingWord === uniqueKey;
          return (
            <button
                key={index}
                onClick={() => handleWordClick(segment, index)}
                disabled={!!loadingWord}
                className={cn(
                    "rounded-sm px-0.5 py-0 hover:bg-primary/20 transition-colors disabled:cursor-wait disabled:hover:bg-transparent",
                    isLoading && "animate-pulse"
                )}
            >
                {segment}
            </button>
          );
        })}
      </p>
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-md rounded-lg px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground border rounded-bl-none"
        )}
      >
        {renderContent()}
      </div>
      {!isUser && (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleListen} disabled={isAudioLoading}>
                {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            {audioSrc && <audio ref={audioRef} src={audioSrc} className="hidden" />}
        </>
      )}
      {isUser && (
         <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
