
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const apiKey = 'AIzaSyChzzeyqzvu6UoqAXgxZ-uV7zPUY8Pi00o';
  const cx = '9508686f6520a4284';

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

  const res = await fetch(url);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
