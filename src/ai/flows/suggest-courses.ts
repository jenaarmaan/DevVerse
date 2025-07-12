
'use server';

/**
 * @fileOverview Suggests relevant courses based on a user's query.
 *
 * - suggestCourses - A function that returns a list of suggested course IDs.
 * - SuggestCoursesInput - The input type for the suggestCourses function.
 * - SuggestCoursesOutput - The return type for the suggestCourses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for a single course, used in the input.
const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

// Define the input schema for the flow.
const SuggestCoursesInputSchema = z.object({
  query: z.string().describe("The user's query about a topic they want to learn."),
  courses: z.array(CourseSchema).describe("The list of all available courses."),
});
export type SuggestCoursesInput = z.infer<typeof SuggestCoursesInputSchema>;

// Define the output schema for the flow.
const SuggestCoursesOutputSchema = z.object({
  suggestedCourseIds: z.array(z.string()).describe("An array of 3-5 of the most relevant course IDs. Return an empty array if no courses are relevant."),
});
export type SuggestCoursesOutput = z.infer<typeof SuggestCoursesOutputSchema>;

// Exported wrapper function that calls the Genkit flow.
export async function suggestCourses(input: SuggestCoursesInput): Promise<SuggestCoursesOutput> {
  return suggestCoursesFlow(input);
}

// This new schema is just for the prompt itself
const PromptInputSchema = z.object({
    query: z.string(),
    coursesJson: z.string(),
});

// Define the Genkit prompt.
const prompt = ai.definePrompt({
  name: 'suggestCoursesPrompt',
  input: { schema: PromptInputSchema },
  output: { schema: SuggestCoursesOutputSchema },
  prompt: `You are an expert course advisor for the DevVerse Hub platform.
Your goal is to help users find the most relevant courses based on their interests.

User's Interest: {{{query}}}

Available Courses (JSON format):
\`\`\`json
{{{coursesJson}}}
\`\`\`

Analyze the user's interest and the list of available courses.
Identify the 3 to 5 most relevant courses.
Return your answer *only* as a JSON object containing an array of the course IDs in the 'suggestedCourseIds' field.
If no courses are relevant, return an empty array.
`,
});

// Define the Genkit flow.
const suggestCoursesFlow = ai.defineFlow(
  {
    name: 'suggestCoursesFlow',
    inputSchema: SuggestCoursesInputSchema,
    outputSchema: SuggestCoursesOutputSchema,
  },
  async (input) => {
    // The flow converts the array to a JSON string for the prompt
    const { output } = await prompt({
        query: input.query,
        coursesJson: JSON.stringify(input.courses),
    });
    return output!;
  }
);
