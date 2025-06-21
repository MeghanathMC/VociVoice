import ChatInterface from "@/components/chat/chat-interface";
import { scenarios } from "@/lib/data";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: {
    scenario: string;
  };
}

export async function generateStaticParams() {
    return scenarios.map((scenario) => ({
      scenario: scenario.id,
    }));
}

const ChatPage = ({ params }: ChatPageProps) => {
  const scenario = scenarios.find((s) => s.id === params.scenario);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <ChatInterface scenario={scenario} />
    </div>
  );
};

export default ChatPage;
