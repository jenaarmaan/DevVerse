"use server";

import { generateProjectIdeas, type GenerateProjectIdeasOutput, type GenerateProjectIdeasInput } from "@/ai/flows/generate-project-ideas";
import { z } from "zod";

const FormSchema = z.object({
  categories: z.string().min(1, { message: "Please enter at least one category." }),
  tags: z.string(),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: GenerateProjectIdeasOutput;
};

export async function generateIdeasAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    categories: formData.get("categories"),
    tags: formData.get("tags"),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: "Validation failed.",
      issues,
      fields: {
        categories: formData.get("categories")?.toString() ?? '',
        tags: formData.get("tags")?.toString() ?? '',
      }
    };
  }
  
  try {
    const result = await generateProjectIdeas(validatedFields.data as GenerateProjectIdeasInput);
    if (!result.ideas || result.ideas.length === 0) {
      return { message: "The AI couldn't generate ideas for this topic. Try different keywords!" };
    }
    return { message: "success", data: result };
  } catch (error) {
    console.error(error);
    return { message: "An unexpected error occurred while contacting the AI. Please try again later." };
  }
}
