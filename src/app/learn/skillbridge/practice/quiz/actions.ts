
"use server";

import { auth } from "@/lib/firebase/config";
import { saveQuizResult } from "@/lib/firebase/firestore";
import { generateQuiz, type GenerateQuizInput, type GenerateQuizOutput } from "@/ai/flows/generate-quiz-flow";
import { z } from "zod";

const GenerateQuizInputSchema = z.object({
  courseTitle: z.string().describe('The title of the course.'),
  courseDescription: z.string().describe('A brief description of the course content.'),
});

const QuizResultSchema = z.object({
  courseId: z.string(),
  score: z.number(),
  timeTaken: z.number(), // in seconds
  completedAt: z.date(),
  timePerQuestion: z.record(z.number()),
});
export type QuizResult = z.infer<typeof QuizResultSchema>;

export async function generateQuizAction(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  const validatedInput = GenerateQuizInputSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error("Invalid input for generating quiz.");
  }
  
  try {
    const result = await generateQuiz(validatedInput.data);
    return result;
  } catch (error) {
    console.error("Error generating quiz with Genkit:", error);
    throw new Error("Failed to generate quiz.");
  }
}

export async function saveQuizResultAction(result: QuizResult) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated.");
  }

  const validatedResult = QuizResultSchema.safeParse(result);
   if (!validatedResult.success) {
    console.error("Invalid quiz result data:", validatedResult.error.flatten());
    throw new Error("Invalid quiz result data.");
  }

  try {
    await saveQuizResult(currentUser.uid, validatedResult.data);
  } catch (error) {
    console.error("Error saving quiz result to Firestore:", error);
    throw new Error("Failed to save quiz result.");
  }
}
