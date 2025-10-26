# 🧠 LLMOps Business Idea Generator – API Folder

This folder contains the **FastAPI backend** for the **Business Idea Generator**, now enhanced with **real-time response streaming**.
It continuously streams text output from the OpenAI model to the frontend, allowing users to see ideas appear live as they are generated.

## ⚙️ What `index.py` Does

* **Initialises a FastAPI application** – a lightweight Python web framework.
* **Defines a single streaming route (`/api`)** that sends incremental updates via Server-Sent Events (SSE).
* **Connects to the OpenAI API** using the `gpt-5-nano` model with `stream=True`.
* **Streams tokens in real time** as the model generates them.
* **Sends data as an event stream**, which the frontend listens to and renders progressively.

In short:

> When the user visits the homepage, the frontend connects to this `/api` route using SSE.
> The FastAPI backend streams the idea **token by token**, so the text appears in real time as it’s generated.

## 🧩 Example Flow

1. The user opens the homepage (`index.tsx`).
2. The browser creates a **live SSE connection** to `GET /api`.
3. The FastAPI backend calls the OpenAI model and starts streaming text.
4. The frontend updates the display in real time as each token arrives.

## ✅ Completion Checklist

| Component                | Description                                               | Status |
| ------------------------ | --------------------------------------------------------- | :----: |
| `index.py`               | FastAPI app with streaming `/api` route                   |    ✅   |
| OpenAI Integration       | Uses `gpt-5-nano` with `stream=True` for token streaming  |    ✅   |
| Server-Sent Events (SSE) | Streams model output live to the frontend                 |    ✅   |
| Real-Time Display        | Users see the idea appear incrementally as it’s generated |    ✅   |
