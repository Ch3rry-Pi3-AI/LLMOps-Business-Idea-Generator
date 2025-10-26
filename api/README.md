# 🧠 LLMOps Business Idea Generator – API Folder

This folder contains the **FastAPI backend** for the **Business Idea Generator**, now enhanced with **real-time streaming** and **Markdown-formatted output**.
It streams well-structured text directly from the OpenAI model to the frontend, allowing users to see **formatted business ideas** appear live with headings, subheadings, and bullet points.

## ⚙️ What `index.py` Does

* **Initialises a FastAPI application** – a lightweight Python web framework for serving API routes.
* **Defines a single streaming route (`/api`)** that delivers incremental updates via **Server-Sent Events (SSE)**.
* **Connects to the OpenAI API** using the `gpt-5-nano` model with `stream=True` for live token generation.
* **Prompts the model for structured Markdown output**, including headings, subheadings, and bullet lists.
* **Streams Markdown content in real time**, so the frontend renders formatted ideas as they’re generated.

In short:

> When the user opens the homepage, the frontend connects to this `/api` route using SSE.
> The FastAPI backend streams a **Markdown-formatted business idea** in real time, so headings, lists, and text appear progressively and beautifully styled.

## 🧩 Example Flow

1. The user loads the homepage (`index.tsx`).
2. The browser opens a **live SSE connection** to `GET /api`.
3. The backend requests a formatted response from OpenAI.
4. The text is **streamed token by token** in Markdown format.
5. The frontend renders it immediately using **ReactMarkdown** and **Tailwind Typography**.

## ✅ Completion Checklist

| Component                  | Description                                                          | Status |
| -------------------------- | -------------------------------------------------------------------- | :----: |
| `index.py`                 | FastAPI app with streaming `/api` route                              |    ✅   |
| OpenAI Integration         | Uses `gpt-5-nano` with `stream=True` for real-time generation        |    ✅   |
| Markdown Output Formatting | Prompts the model to include headings, subheadings, and bullet lists |    ✅   |
| Server-Sent Events (SSE)   | Streams model output to the frontend live                            |    ✅   |
| Styled Display Integration | Frontend renders Markdown output with ReactMarkdown + Tailwind       |    ✅   |
