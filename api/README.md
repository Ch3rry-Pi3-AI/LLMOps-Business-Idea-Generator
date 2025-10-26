# 🧠 LLMOps Business Idea Generator – API Folder

This folder contains the **FastAPI backend** for the **Business Idea Generator**.
It provides a simple, deployable Python API that communicates with OpenAI’s models to generate new business ideas on demand.

## ⚙️ What `index.py` Does

* **Initialises a FastAPI application** – a lightweight web framework for Python.
* **Defines a single route (`/api`)** that listens for incoming GET requests.
* **Connects to the OpenAI API** using the `gpt-5-nano` model.
* **Generates a new AI-powered business idea** every time the endpoint is called.
* **Returns the idea as plain text**, ready for display in the Next.js frontend.

In short:

> When the user visits your site, the frontend calls this `/api` route —
> which triggers the model to come up with a brand-new business idea for AI agents.

## 🧩 Example Flow

1. The user loads the homepage (`index.tsx`)
2. The page sends a request to `GET /api`
3. The FastAPI app in `index.py` calls the OpenAI model
4. The generated idea is returned and displayed instantly

## ✅ Completion Checklist

| Component           | Description                                       | Status |
| ------------------- | ------------------------------------------------- | :----: |
| `index.py`          | FastAPI app with `/api` route for idea generation |    ✅   |
| OpenAI Integration  | Uses `gpt-5-nano` for lightweight inference       |    ✅   |
| Plain Text Response | Returns simple text output for frontend display   |    ✅   |
