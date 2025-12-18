export interface LLMProvider {
    chat(query:string) : Promise<string>;
}