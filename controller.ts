import { Elysia } from "elysia";
import { LLM } from "./llm";
import figlet from 'figlet';
import { PROVIDERS } from "./enum";

export const LLMController = new Elysia().get("/", () => new Response('Bun!')).get("/figlet", () => { 
    const body = figlet.textSync('Bun!'); 
    return new Response(body); 
  }).get("/chat/:query", async (req) => {
    const {query} = req.params;
    const llm = new LLM(PROVIDERS.Gemini);
    const res = await llm.llmService(query);
    return new Response(res);
  });