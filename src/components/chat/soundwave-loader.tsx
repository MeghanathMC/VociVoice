import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SoundwaveLoader = () => {
  return (
    <div className="flex items-end gap-3 justify-start">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/20 text-primary">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-end gap-1 bg-card rounded-lg px-4 py-3 border">
            <div className="h-1 w-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1 w-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1 w-1 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
    </div>
  );
};

export default SoundwaveLoader;
