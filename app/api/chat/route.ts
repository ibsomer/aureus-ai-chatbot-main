import { OpenAIStream, StreamingTextResponse } from 'ai';
import { type ChatCompletionRequestMessage } from 'openai-edge';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: ChatCompletionRequestMessage[] = body.messages;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: messages,
      stream: true,
    }),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
