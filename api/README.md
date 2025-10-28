# 🧠 LLMOps Business Idea Generator – API Folder

This folder contains the **FastAPI backend** for the **Business Idea Generator**, now upgraded with **user authentication via Clerk** and **secure, real-time streaming** of Markdown-formatted business ideas.

Each API request is verified using a **JWT token** issued by Clerk.
Only authenticated users can access the `/api` endpoint, ensuring secure and personalised idea generation.

## ⚙️ What `index.py` Does

* **Initialises a FastAPI application** — a lightweight Python web framework for serving API routes.
* **Configures Clerk authentication** using `fastapi-clerk-auth` to validate JSON Web Tokens (JWTs).
* **Restricts access** to authenticated users by requiring valid credentials for every `/api` request.
* **Connects to the OpenAI API** via the `gpt-5-nano` model with `stream=True` for live token streaming.
* **Streams Markdown-formatted text in real time**, enabling the frontend to render structured, styled output as it’s generated.
* **Supports user-specific handling**, such as storing user IDs, tracking usage, or customising output based on the authenticated user.

In short:

> When a signed-in user accesses `/api`, the request includes their **Clerk JWT**.
> The backend verifies this token, connects to OpenAI, and **streams a structured business idea** live — securely and in real time.

## 🧩 Example Flow

1. The user signs in via Clerk on the homepage (`index.tsx`).
2. The `product.tsx` page retrieves the user’s JWT using Clerk’s `useAuth()` hook.
3. The frontend sends the token in the `Authorization: Bearer` header to `/api`.
4. The FastAPI backend validates the token using **Clerk’s JWKS endpoint**.
5. Once authenticated, the backend connects to OpenAI, prompting for a structured idea.
6. The generated text streams token-by-token to the frontend, rendered live in Markdown.

## 🔐 Authentication Overview

* **Library Used:** [`fastapi-clerk-auth`](https://pypi.org/project/fastapi-clerk-auth/)
* **Environment Variable:** `CLERK_JWKS_URL`
  Points to Clerk’s JSON Web Key Set (JWKS) URL for token verification.
* **Header Used:**
  `Authorization: Bearer <JWT>`
  Each request includes this token to authenticate the user session.

## ✅ Completion Checklist

| Component                | Description                                                    | Status |
| ------------------------ | -------------------------------------------------------------- | :----: |
| `index.py`               | FastAPI app secured with Clerk authentication                  |    ✅   |
| JWT Validation           | Validates user tokens via Clerk JWKS URL                       |    ✅   |
| Secure Streaming Route   | `/api` endpoint accessible only to authenticated users         |    ✅   |
| OpenAI Integration       | Uses `gpt-5-nano` with `stream=True` for live generation       |    ✅   |
| Markdown Output          | Structured ideas with headings, subheadings, and bullet points |    ✅   |
| Server-Sent Events (SSE) | Streams model output securely and incrementally                |    ✅   |