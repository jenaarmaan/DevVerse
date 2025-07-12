import { geminiChatStream } from '@/ai/flows/gemini-chat-flow';
import { NextRequest, NextResponse } from 'next/server';

function iteratorToStream(iterator: AsyncGenerator<string>): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(new TextEncoder().encode(value));
      }
    },
  });
}

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return new NextResponse('Message is required', { status: 400 });
        }
        
        const stream = iteratorToStream(geminiChatStream(message));

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error('Error in chat API:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
