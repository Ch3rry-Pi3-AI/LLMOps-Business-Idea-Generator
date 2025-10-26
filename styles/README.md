# 🎨 LLMOps Business Idea Generator – Styles Folder

This folder contains the **global styling files** for the **Business Idea Generator** frontend, now upgraded with **enhanced typography**, **gradient backgrounds**, and **Markdown-specific formatting** for professional presentation.

It defines how every visual element — from text to layout — appears across the application, ensuring a consistent, modern, and accessible interface in both light and dark modes.

## ⚙️ What `globals.css` Does

* Imports **Tailwind CSS**, the utility-first framework used throughout the app.
* Defines **CSS variables** for background and foreground colours, adapting to light and dark themes automatically.
* Adds a **comprehensive `.markdown-content` style layer**, handling headings, lists, paragraphs, and emphasis for streamed Markdown output.
* Establishes **font families**, **contrast ratios**, and **responsive sizing** to maintain readability on any device.
* Complements Tailwind classes with fine-grained typographic control for **ReactMarkdown-rendered** content.

In simple terms:

> `globals.css` gives the Business Idea Generator its professional look and feel — providing responsive layout structure, adaptive colour theming, and polished Markdown presentation that makes each generated idea visually appealing and easy to read.

## 🧩 How It Works in the App

1. `globals.css` is imported globally via `_app.tsx`, applying consistent styling across all pages.
2. The `.markdown-content` class defines how streamed Markdown text (from the backend) appears, with clear heading hierarchies and readable spacing.
3. Tailwind utility classes in `index.tsx` handle layout and responsive design (gradients, shadows, padding).
4. Dark mode is activated automatically via the user’s OS preferences for a seamless experience.

## ✅ Completion Checklist

| Component                  | Description                                                  | Status |
| -------------------------- | ------------------------------------------------------------ | :----: |
| `globals.css`              | Defines global styles, typography, and layout theme          |    ✅   |
| Tailwind Integration       | Utility-based responsive design for fast iteration           |    ✅   |
| Markdown Styling Layer     | Custom `.markdown-content` formatting for AI-generated ideas |    ✅   |
| Dark Mode Support          | Automatic colour adjustment using media queries              |    ✅   |
| Consistent Visual Identity | Unified theme across all pages and components                |    ✅   |
