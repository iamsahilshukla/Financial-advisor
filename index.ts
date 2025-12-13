import figlet from 'figlet'; 
import {LLM} from "./llm.ts";
import { PROVIDERS } from './enum.ts';
const server = Bun.serve({
  port: 3000,
  idleTimeout:60,
  routes: {
    "/": () => new Response('Bun!'),

    "/figlet": () => { 
      const body = figlet.textSync('Bun!'); 
      return new Response(body); 
    },

    "/chat/:query" : async req => {
        const {query} = req.params;
        const llm = new LLM(PROVIDERS.Gemini);
        const res = await llm.llmService(query);
        return new Response(res);
    }
  }
});

console.log(`Listening on ${server.url}`);