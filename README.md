# Finance Advisor

A financial advisor tool built with Bun that provides an HTTP API for LLM-powered chat using Google's Gemini API.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- `GEMINI_API_KEY` environment variable set (add to `.env` file)

### Installation

```bash
bun install
```

### Running the Server

```bash
bun run start        # Start the server
bun --hot index.ts   # Start with hot reload for development
```

The server runs on `http://localhost:3000`.

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Health check |
| `GET /figlet` | ASCII art demo |
| `GET /chat/:query` | LLM chat endpoint |
| `GET /swagger` | Swagger UI documentation |

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **LLM Provider**: Google Gemini
- **Documentation**: Swagger
