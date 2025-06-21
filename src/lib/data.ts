import type { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  {
    id: "airport",
    name: "At the Airport",
    description: "Navigate check-in, security, and boarding.",
    icon: "Plane",
    backgroundImage: "airport terminal",
  },
  {
    id: "cafe",
    name: "Ordering at a Café",
    description: "Practice ordering coffee and pastries.",
    icon: "Coffee",
    backgroundImage: "cafe interior",
  },
  {
    id: "taxi",
    name: "Taking a Taxi",
    description: "Give directions and pay the fare.",
    icon: "Car",
    backgroundImage: "taxi city",
  },
  {
    id: "restaurant",
    name: "In a Restaurant",
    description: "Book a table, order food, and handle the bill.",
    icon: "UtensilsCrossed",
    backgroundImage: "restaurant dining",
  },
  {
    id: "store",
    name: "Shopping at a Store",
    description: "Ask for items, sizes, and prices.",
    icon: "ShoppingBasket",
    backgroundImage: "clothing store",
  },
  {
    id: "directions",
    name: "Asking for Directions",
    description: "Find your way around a new city.",
    icon: "HelpCircle",
    backgroundImage: "asking directions",
  },
];

export const progressData = {
  sessions: 24,
  duration: 12.5, // in hours
  improvement: 15, // in percentage
};

export const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "japanese", label: "Japanese" },
    { value: "italian", label: "Italian" },
    { value: "chinese", label: "Chinese" },
];
