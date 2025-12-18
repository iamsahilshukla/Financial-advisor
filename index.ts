import Elysia from 'elysia';
import { LLMController } from './controller.ts';
import swagger from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors'

const server = new Elysia().use(cors({
  origin: "*"
})).use(swagger({
  documentation: {
    info: {
      title: 'Finance Advisor API',
      version: '1.0.0',
      description: 'LLM-powered financial advisor API'
    }
  }
})).use(LLMController).listen(3000);

console.log(`Listening on ${server.server?.hostname}:${server.server?.port}`);