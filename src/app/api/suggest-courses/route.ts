
import { NextRequest, NextResponse } from 'next/server';
import { getCourses } from '@/lib/firebase/firestore';
import { suggestCourses } from '@/ai/flows/suggest-courses';

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return new NextResponse(JSON.stringify({ message: 'Query is required' }), { status: 400 });
        }

        // Fetch all available courses
        const courses = await getCourses();

        // Prepare the input for the AI flow
        const flowInput = {
            query,
            courses: courses.map(({ id, title, description, tags }) => ({ id, title, description, tags })),
        };

        // Call the Genkit flow to get suggestions
        const result = await suggestCourses(flowInput);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in course suggestion API:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
