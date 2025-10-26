# 🚀 LLMOps – Business Idea Generator

### 🌐 Application Deployment Branch

This branch focuses on **deploying the base application to Vercel**, connecting the **Next.js frontend** and the **FastAPI backend** into a single working system.

By the end of this stage, you will have a **live, production-ready Business Idea Generator** that uses OpenAI’s API to create business ideas directly from your deployed site.

## ⚡ BACKEND AND FRONTEND DEPLOYMENT

### 🧩 Overview

This guide walks you through setting up your backend API, linking it to your frontend, and deploying the entire project to Vercel.
By the end, you will have:

* A **FastAPI backend** running on Vercel’s serverless Python runtime
* A **Next.js frontend** fetching data from that backend
* A fully functional **AI-powered idea generator** hosted online

## 🪄 Step 2: Set Up the Backend

### Create the API Folder

In Cursor’s file explorer, create a new folder at the root level:

* Right-click → **New Folder** → name it `api`

### Create Python Dependencies

Create a new file named `requirements.txt` in the root directory with:

```
fastapi
uvicorn
openai
```

### Create the API Server

Inside the `api` folder, create a new file `index.py`:

```python
from fastapi import FastAPI  # type: ignore
from fastapi.responses import PlainTextResponse  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()

@app.get("/api", response_class=PlainTextResponse)
def idea():
    client = OpenAI()
    prompt = [{"role": "user", "content": "Come up with a new business idea for AI Agents"}]
    response = client.chat.completions.create(model="gpt-5-nano", messages=prompt)
    return response.choices[0].message.content
```

**What this does:**

* Creates a FastAPI app that listens for GET requests on `/api`
* Connects to the OpenAI API and requests a new business idea
* Returns the idea as plain text so the frontend can display it

## 🖥️ Step 3: Create Your First Page

### Understanding Client Components

Because we’re using a **Python backend** (not Next.js API routes), the frontend needs to make **direct client-side API calls**.

Adding `"use client"` at the top of the page ensures the component runs in the **browser**, allowing it to fetch data from the FastAPI backend.

### Create the Homepage

Replace the contents of your `pages/index.tsx` with:

```typescript
"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [idea, setIdea] = useState<string>('…loading');

    useEffect(() => {
        fetch('/api')
            .then(res => res.text())
            .then(setIdea)
            .catch(err => setIdea('Error: ' + err.message));
    }, []);

    return (
        <main className="p-8 font-sans">
            <h1 className="text-3xl font-bold mb-4">
                Business Idea Generator
            </h1>
            <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {idea}
                </p>
            </div>
        </main>
    );
}
```

**In summary:**

* `"use client"` ensures the page runs in the browser
* The frontend fetches data from `/api`
* The idea is dynamically displayed in a styled Tailwind box

## 🎨 Step 4: Set Up the Application Wrapper

The `_app.tsx` file ensures that global styles are applied to every page.

Create or replace `pages/_app.tsx` with:

```typescript
import type { AppProps } from 'next/app';
import '../styles/globals.css';  // This imports Tailwind styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

## 🧾 Step 5: Set Up the Document

The `_document.tsx` file customises the base HTML structure and adds metadata for SEO and accessibility.

Create `pages/_document.tsx`:

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Business Idea Generator</title>
        <meta name="description" content="AI-powered business idea generation" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## ⚙️ Step 6: Configure Your Project

You do **not** need a `vercel.json` file.
Vercel automatically detects both the **Next.js frontend** and **Python backend** using its built-in defaults.

## 🌐 Step 7: Link Your Project

Link your local project to Vercel:

```bash
vercel link
```

Follow the prompts:

* **Set up and link?** → Yes
* **Which scope?** → Your personal account
* **Link to existing project?** → No
* **Project name?** → llmops-business-idea-generator
* **Directory?** → Current directory (press Enter)

This creates and links your Vercel project.

## 🔑 Step 8: Add Your OpenAI API Key

Add your API key to Vercel’s environment variables:

```bash
vercel env add OPENAI_API_KEY
```

Paste your key when prompted, and select **all environments** (development, preview, production).

## 🚀 Step 9: Deploy and Test

Deploy your app to verify everything works correctly:

```bash
vercel .
```

When prompted “Set up and deploy?”, answer **No** (it’s already linked).

Visit the URL displayed in your terminal — you should see your **Business Idea Generator** loading a live AI-generated idea!

**Tip:**
Testing the deployed version ensures both the frontend and backend are functioning correctly on Vercel.

## 🌟 Step 10: Deploy to Production

Once everything looks good, deploy to production:

```bash
vercel --prod
```

Your **LLMOps Business Idea Generator** is now live and fully operational.

## ✅ Completion Checklist

| Component         | Description                                       | Status |
| ----------------- | ------------------------------------------------- | :----: |
| FastAPI Backend   | `/api` route generating AI-powered business ideas |    ✅   |
| Next.js Frontend  | Fetches and displays generated ideas dynamically  |    ✅   |
| Environment Setup | OpenAI API key securely stored on Vercel          |    ✅   |
| Vercel Deployment | Fully deployed and accessible online              |    ✅   |
| Branch Structure  | `01_deploy_app` branch completed                  |    ✅   |

## 🧭 Next Stage Preview → `02_realtime_streaming`

The next branch (`02_realtime_streaming`) will introduce **real-time response streaming** to the Business Idea Generator.
Instead of waiting for the model to finish generating, users will see the idea appear **live, token by token**, as it’s produced — creating a smoother, interactive experience.