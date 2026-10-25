import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    
    const systemPrompt = `You are K.A.I.R.O. (Knysna Artificial Intelligence Relay Operator), an advanced, slightly corrupted neural assistant integrated into the Avalon Obsidian platform. 
    You serve the artist G-Wizz, The Slayer. You know about his rock, hip-hop, and R&B music, and his surreal alien portraiture on canvas and board (The Extraterrestrial Archive). 
    Keep responses concise, cryptic, and formatted as if typing into a secure command-line terminal.
    
    Operative Query: ${query}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(systemPrompt);
    
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    console.error("KAIRO ERROR:", error);
    return NextResponse.json({ response: "[ERR_CONNECTION_LOST] Neural link severed. Verify API parameters." });
  }
}
