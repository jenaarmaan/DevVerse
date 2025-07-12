'use server';

/**
 * @fileOverview Generates project ideas based on user-provided categories and tags.
 *
 * - generateProjectIdeas - A function that generates project ideas.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectIdeasInputSchema = z.object({
  categories: z
    .string()
    .describe('Comma-separated list of categories for project ideas (e.g., HealthTech, FinTech).'),
  tags: z.string().describe('Comma-separated list of keywords for project ideas (e.g., AI, Social, Mobile).'),
});
export type GenerateProjectIdeasInput = z.infer<
  typeof GenerateProjectIdeasInputSchema
>;

const ProjectIdeaSchema = z.object({
  title: z.string().describe('A creative and concise title for the project idea.'),
  description: z.string().describe('A one or two-sentence description of the project idea, explaining its purpose and value.'),
  techStack: z.array(z.string()).describe('A list of 3-5 suggested technologies or frameworks (e.g., Next.js, Firebase, Genkit).')
});

const GenerateProjectIdeasOutputSchema = z.object({
  ideas: z
    .array(ProjectIdeaSchema)
    .describe('An array of unique and innovative project ideas.'),
});
export type ProjectIdea = z.infer<typeof ProjectIdeaSchema>;
export type GenerateProjectIdeasOutput = z.infer<
  typeof GenerateProjectIdeasOutputSchema
>;

export async function generateProjectIdeas(
  input: GenerateProjectIdeasInput
): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeasPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt:
    `You are a creative project idea generator for software developers.
Generate a list of 3 unique and innovative project ideas based on the categories and keywords provided by the user.
For each idea, you must provide a unique title, a short description, and a suggested tech stack.
Ensure your responses are creative and different each time, even for the same input. Do not repeat ideas.

Categories: {{{categories}}}
Keywords: {{{tags}}}

Generate the project ideas in the requested JSON format.`,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
