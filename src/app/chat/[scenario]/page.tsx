import ChatInterface from "@/components/chat/chat-interface";
import { scenarios } from "@/lib/data";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: {
    scenario: string;
  };
}

const getDayOfYear = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

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

  const dayOfYear = getDayOfYear(new Date());
  const dailyChallengeScenario = scenarios[dayOfYear % scenarios.length];
  const isDailyChallenge = scenario.id === dailyChallengeScenario.id;

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <ChatInterface scenario={scenario} isDailyChallenge={isDailyChallenge} />
    </div>
  );
};

export default ChatPage;
