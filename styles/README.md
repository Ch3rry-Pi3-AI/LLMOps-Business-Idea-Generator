# 🎨 LLMOps Business Idea Generator – Styles Folder

This folder contains the **global styling files** for the **Business Idea Generator** frontend.
It controls the overall look and feel of the application, including colours, fonts, and dark mode behaviour.

## ⚙️ What `globals.css` Does

* Imports **Tailwind CSS**, a utility-first styling framework that makes it easy to design directly in your JSX.
* Defines **CSS variables** for the site’s background and text colours.
* Supports both **light** and **dark** modes automatically using the user’s system preferences.
* Applies a **consistent font and colour theme** across all pages.

In simple terms:

> `globals.css` is where the entire website’s theme lives — it ensures every page looks consistent and automatically adapts to dark or light mode.

## 🧩 How It Works in the App

1. `globals.css` is imported into `_app.tsx`, which loads it for every page.
2. Tailwind utility classes (like `bg-blue-500` or `p-6`) are used in page components.
3. The global CSS variables make colours and fonts consistent across all UI elements.

## ✅ Completion Checklist

| Component            | Description                                       | Status |
| -------------------- | ------------------------------------------------- | :----: |
| `globals.css`        | Defines global colours, fonts, and Tailwind setup |    ✅   |
| Tailwind Integration | Utility-based styling for quick design iteration  |    ✅   |
| Dark Mode Support    | Automatic theme adjustment via system settings    |    ✅   |
