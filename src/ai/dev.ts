import { config } from 'dotenv';
config();

import '@/ai/flows/generate-project-ideas.ts';
import '@/ai/flows/gemini-chat-flow.ts';
import '@/ai/flows/suggest-courses.ts';
import '@/ai/flows/generate-quiz-flow.ts';
