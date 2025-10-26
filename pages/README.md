# 🌐 LLMOps Business Idea Generator – Pages Folder

This folder contains the **Next.js frontend pages** for the **Business Idea Generator**.
These files define how the website looks, behaves, and communicates with the backend API.

## ⚙️ What Each File Does

### `index.tsx`

* This is the **homepage** that users see first.
* It fetches a business idea from the backend (`/api`) when the page loads.
* Displays the idea inside a styled box using **Tailwind CSS**.
* Automatically updates every time the backend generates a new idea.

### `_app.tsx`

* The **main wrapper** for all pages in the app.
* Ensures that global styles (like Tailwind) apply everywhere.
* A good place to later add global settings, layouts, or context providers.

### `_document.tsx`

* Defines the **base HTML structure** for all pages.
* Sets metadata such as the page title and description.
* Useful for adding analytics, favicons, or fonts in the future.

## 🧩 How It Works Together

1. When a user opens the site, `index.tsx` loads first.
2. It sends a request to `/api` (the FastAPI backend).
3. The backend returns an AI-generated business idea.
4. The idea is displayed on the homepage, styled by Tailwind CSS.

## ✅ Completion Checklist

| Component       | Description                                     | Status |
| --------------- | ----------------------------------------------- | :----: |
| `index.tsx`     | Homepage fetching and displaying business ideas |    ✅   |
| `_app.tsx`      | Global wrapper applying shared styles           |    ✅   |
| `_document.tsx` | Custom HTML structure and metadata              |    ✅   |
