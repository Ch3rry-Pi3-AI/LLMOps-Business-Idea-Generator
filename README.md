# 🚀 LLMOps – Business Idea Generator

**From prototype to production-ready SaaS — real-time AI idea generation with authentication, subscriptions, and a polished UX.**

AI-powered ideas stream live from a FastAPI backend to a Next.js frontend. Users sign in with Clerk, upgrade to a premium plan, and generate ideas in a beautifully styled interface. Deployed on Vercel.

## ✨ Highlights

* **Real-time streaming** of model output (token-by-token) to the UI
* **Polished UI** with gradients, dark mode, and clean Markdown rendering
* **Secure auth** with Clerk (email + social sign-in) and **JWT-verified backend**
* **Subscriptions** with plan gating and in-app purchase flow
* **Vercel deployment**: Next.js (frontend) + Python (FastAPI) in one project

## 🎬 Demo

![Sign up flow](img/sign_up.gif)
*Sign in with email or social, verify with code, and land in the app.*

![Subscription & payment](img/pay.gif)
*Choose free or premium. Enter card details and complete a test payment.*

![Generate ideas (streaming)](img/generate.gif)
*See a business idea stream live, formatted with headings and bullet points.*

## 🧭 Project Journey (Branches)

* **00_project_setup** — Scaffolded Next.js (Pages Router + Tailwind) and FastAPI, set up Vercel deployment.
* **01_deploy_app** — Hooked up the frontend to a Python `/api` endpoint on Vercel; live app fetching ideas from OpenAI.
* **02_realtime_streaming** — Switched to SSE for end-to-end streaming; React renders content as it arrives.
* **03_styling** — Introduced gradient themes, glass cards, dark mode, and clean Markdown typography.
* **04_user_authentication** — Added Clerk; protected routes; JWT verification on every backend request.
* **05_user_subscription** — Enabled Clerk Billing; plan-gated product page; instant unlock after purchase.

## 🏗️ Architecture (at a glance)

* **Frontend:** Next.js (Pages Router), TypeScript, Tailwind
* **Backend:** FastAPI (Python), SSE streaming
* **Auth & Billing:** Clerk (JWT + JWKS verification, plan gating)
* **LLM:** OpenAI Chat Completions (streamed)
* **Hosting:** Vercel (Next.js + Python runtime)

## 🔧 Quick Start

```bash
# 1) Install frontend deps
npm install

# 2) Set local env (create .env.local)
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
# CLERK_SECRET_KEY=...
# CLERK_JWKS_URL=...
# OPENAI_API_KEY=...

# 3) Run locally (frontend)
npm run dev

# 4) Deploy
vercel --prod
```

Notes

* The FastAPI route streams via SSE (`/api`) and verifies Clerk JWTs with JWKS.
* Environment variables must be added in Vercel for production.

## 🧩 Tech Stack

* **UI:** Next.js, Tailwind CSS, React Markdown, Tailwind Typography
* **API:** FastAPI, `StreamingResponse` (SSE)
* **Auth/Billing:** Clerk (`@clerk/nextjs`, plan gating, PricingTable)
* **LLM:** OpenAI Chat Completions (streaming)
* **Infra:** Vercel (frontend + serverless Python)

## 📌 What’s Next

* Usage analytics and per-user rate limits
* Saved ideas and history (DB)
* Custom prompt templates and persona presets
* Multi-model/region routing and fallbacks