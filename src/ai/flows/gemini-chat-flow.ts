'use server';

/**
 * @fileOverview A Gemini-powered chatbot flow.
 *
 * - geminiChatStream - A function that handles the chat conversation with streaming.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export async function* geminiChatStream(message: string): AsyncGenerator<string> {
    const chat = ai.model('googleai/gemini-pro');

    const { stream } = ai.generateStream({
        model: chat,
        prompt: message,
        history: [
            {
                role: 'user',
                content: 'You are a helpful assistant integrated into the DevVerse Hub platform. Be friendly, concise, and helpful.'
            },
            {
                role: 'model',
                content: 'Hello! I am the DevVerse assistant. How can I help you today?'
            }
        ],
    });

    for await (const chunk of stream) {
        yield chunk.text;
    }
}
