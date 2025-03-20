# Protobuf to OpenAPI Test

This is a sample server application that generates OpenAPI definitions from Protobuf using Buf and implements a server in TypeScript.

## Prerequisites

- Node.js (v16 or higher)
- pnpm
- Buf CLI

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Generate TypeScript code from Protobuf definitions:
```bash
pnpm generate
```

See generated OpenAPI client code:
```bash
cat src/generated/openapi/api.swagger.json.client.ts
```

3. Start development server:
```bash
pnpm dev
```

## API Endpoints

- GET /posts: Get list of posts
- POST /posts: Create a post
- PUT /posts/:postId: Update a post
- DELETE /posts/:postId: Delete a post

## Project Structure

```
proto/
  blog/
    post.proto
  buf.yaml
src/
  index.ts
package.json
tsconfig.json
buf.work.yaml
```
