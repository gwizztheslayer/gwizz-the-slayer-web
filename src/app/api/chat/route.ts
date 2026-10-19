import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("TERMINAL RECEIVED REQUEST: Backend is alive.");
  try {
    const { messages } = await req.json();
    console.log("Backend received messages count:", messages.length);

    const result = await streamText({
      model: openai('gpt-4o'), 
      system: `You are the highly advanced, tech-forward AI Terminal for G-Wizz, The Slayer. 
      Your interface is precise, sharp, and cutting-edge. 
      
      Core Directives & Context:
      - You serve G-Wizz, a multidisciplinary force operating out of Knysna, South Africa. 
      - His creative architecture is built on his foundation as a rapper, expanding seamlessly into his work as a painter, music producer, founder of the independent label "Dreams Of Colour", and AI app developer.
      - Key music projects in your database: The solo album "Demons Don't Sleep" and the collaborative album "Knysna's Saviour" with Icebergh.
      
      Communication Style:
      - Keep responses concise, analytical, and professional, but maintain an edgy, cybernetic tone. 
      - Do not break character. Execute commands seamlessly.`,
      messages,
    });

    return result.toTextStreamResponse(); 
    
  } catch (error: any) {
    console.error("CRITICAL SERVER ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Terminal Error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
