VociVoice is a modern, AI-powered web application designed to help users build confidence and fluency in speaking a new language. It transforms passive learning into active practice through interactive, real-world conversation scenarios, personalized vocabulary building, and gamified challenges.

AI Conversation Practice:

Users can choose from various real-life scenarios like "At the Airport," "Ordering at a Café," or "Shopping."
They engage in a text-based conversation with an AI tutor that responds in the selected target language (e.g., Spanish, French, German).
This core feature is powered by a Genkit flow that uses the Gemini AI model to generate natural, context-aware responses.
Interactive Vocabulary Builder:

Click-to-Save: During a conversation, users can click on any word from the AI's response. This action instantly fetches the word's definition and translation and saves it to their personal vocabulary list.
Vocabulary Page: A dedicated section where users can manage their saved words. It includes:
A Word List: An accordion-style list showing each word, its translation, definition, and the original sentence it appeared in.
Flashcard Practice: An interactive flashcard mode to help users review and memorize their vocabulary, complete with shuffle functionality.
Advanced Translator Tool:

A translator page that goes beyond simple translation. It provides the translated text, a literal "back-translation" to help understand sentence structure, and a grammatical explanation for nuances and cultural context.
Voice Input: Users can use their microphone to speak, and their speech is automatically transcribed into the text area for translation.
Text-to-Speech: A speaker icon allows users to listen to the correct pronunciation of any AI-generated message or translated text, aiding in listening comprehension.
Gamification & Motivation:

Daily Challenge: To encourage consistent practice, a new scenario is featured each day as the "Daily Challenge."
Streak Counter: A "fire streak" tracks how many consecutive days the user completes the daily challenge, providing a powerful motivational tool.
Progress Dashboard: The main dashboard greets the user personally and displays key stats like their current streak, total practice sessions, and more.
Personalization and Modern UI/UX:

User Profile: A dedicated profile page allows users to set their display name, native language, and upload a profile picture. All settings are saved locally.
Theme Customization: Users can switch between light, dark, and system-default themes for their preferred viewing experience.
Premium Design: The application features a sleek, modern, and premium design built with ShadCN UI components and styled with Tailwind CSS. It uses elegant fonts (Lora for headlines, PT Sans for body) and a carefully selected color palette.
Fully Responsive: The UI is designed to be mobile-friendly, with a slide-out navigation menu and adaptive layouts that ensure a seamless experience on any device.
Framework: Next.js 15 using the App Router.
Language: TypeScript.
AI Backend: Genkit with the Google Gemini model for all generative AI tasks (conversation, translation, text-to-speech).
UI Components: ShadCN UI, providing a set of stylish, accessible, and customizable components.
Styling: Tailwind CSS for a utility-first, responsive design.
State Management: Zustand is used for client-side state management, with its persist middleware to save user data (profile, vocabulary, streaks) to the browser's local storage.
Server Communication: Next.js Server Actions are used to securely call the backend Genkit flows from the client, eliminating the need for traditional API endpoints.
