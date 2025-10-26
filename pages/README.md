# 🌐 LLMOps Business Idea Generator – Pages Folder

This folder contains the **Next.js frontend pages** for the **Business Idea Generator**, now upgraded with **professional styling** and **structured Markdown rendering**.
These files define how the application looks, behaves, and dynamically displays the AI-generated business ideas streamed from the backend in real time.

## ⚙️ What Each File Does

### `index.tsx`

* This is the **homepage** that users interact with.
* Connects to the backend (`/api`) using **Server-Sent Events (SSE)** for live streaming.
* Displays the generated business idea in **real time** using **ReactMarkdown** for clean, formatted output.
* Uses a **responsive layout** with gradient backgrounds, rounded cards, and soft shadows.
* Fully supports **dark mode**, **Markdown headings**, and **bullet points** styled via `.markdown-content`.

### `_app.tsx`

* The **main wrapper** for all pages.
* Imports global CSS styles (including Tailwind and Markdown formatting).
* Ideal for adding context providers, themes, or global state management in future stages.

### `_document.tsx`

* Defines the **base HTML structure** and metadata for all pages.
* Adds `<title>` and `<meta>` tags for SEO and accessibility.
* Can later include analytics, font imports, or additional HTML-level scripts.

## 🧩 How It Works Together

1. The user opens the homepage (`index.tsx`).
2. The frontend connects to the FastAPI backend via **SSE**.
3. The backend streams **Markdown-formatted** content token by token.
4. The React component updates the UI live, rendering the Markdown with enhanced typography.
5. The global and Markdown-specific CSS styles ensure a polished, readable experience.

## ✅ Completion Checklist

| Component       | Description                                                        | Status |
| --------------- | ------------------------------------------------------------------ | :----: |
| `index.tsx`     | Styled real-time streaming homepage using SSE + ReactMarkdown      |    ✅   |
| `_app.tsx`      | Global wrapper applying Tailwind and Markdown styling              |    ✅   |
| `_document.tsx` | Custom HTML structure and metadata for SEO and accessibility       |    ✅   |
| Dark Mode       | Adaptive colour scheme for seamless light/dark theme transitions   |    ✅   |
| Markdown Layout | Structured headings, lists, and typography for professional output |    ✅   |
