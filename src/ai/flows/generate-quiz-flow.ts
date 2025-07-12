'use server';

/**
 * @fileOverview Generates a multiple-choice quiz based on a course topic.
 *
 * - generateQuiz - A function that generates a 10-question quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  courseDescription: z.string().describe('A brief description of the course content.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe("The text of the multiple-choice question."),
    options: z.array(z.string()).length(4).describe("An array of exactly four possible answers."),
    correctAnswerIndex: z.number().min(0).max(3).describe("The index (0-3) of the correct answer in the options array."),
    explanation: z.string().describe("A brief explanation for why the correct answer is right."),
});

const GenerateQuizOutputSchema = z.object({
  questions: z
    .array(QuizQuestionSchema)
    .length(10)
    .describe('An array of exactly 10 multiple-choice questions.'),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert curriculum developer and quiz creator. Your task is to generate a challenging 10-question multiple-choice quiz based on the provided course title and description.
The quiz should test fundamental concepts related to the topic. For each question, provide four distinct options and clearly identify the correct one. Also include a brief explanation for the correct answer.

Course Title: {{{courseTitle}}}
Course Description: {{{courseDescription}}}

Generate the 10 questions in the requested JSON format. Ensure the questions are relevant, clear, and cover a range of concepts from the course material.`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
