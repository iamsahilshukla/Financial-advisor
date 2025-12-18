import {GoogleGenAI} from '@google/genai';
import { PROVIDERS } from './enum';

export class LLM {
private readonly GEMINI_API_KEY;
private readonly OPENROUTER_API_KEY;
private readonly gemini;
private readonly provider;

constructor (provider: PROVIDERS ){
    this.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    this.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    this.gemini = new GoogleGenAI({apiKey: this.GEMINI_API_KEY});
    this.provider = provider;
}

public async llmService(query:string): Promise<string>{
  switch (this.provider){
    case PROVIDERS.Gemini:
      return await this._geminiAPI(query);
    case PROVIDERS.OpenAI:
      return await this._openaiAPI(query);
    case PROVIDERS.OpenRouter:
      return await this._openRouterAPI(query);
    default:
      return new Promise(resolve => resolve("Something went wrong, Provider is not supported, check the provider again"));
  }
}

private async _geminiAPI(query: string) :Promise<string> {
  const response = await this.gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query,
  });
  return response.text as string;
};

private async _openaiAPI(query:string): Promise<string> {
  return new Promise(resolve => resolve("Not yet Implemented"));
}

private async _openRouterAPI(query: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${this.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        { role: "user", content: query }
      ]
    })
  });

  const data = await response.json() as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "No response from OpenRouter";
}
}
