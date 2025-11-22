# 🚀 LLMOps – Business Idea Generator

### 🔐 User Authentication Branch (`04_user_authentication`)

This branch upgrades the **LLMOps Business Idea Generator** from a demo into a real SaaS by adding **enterprise-grade authentication** with **Clerk**.
Users sign in (Google, GitHub, Email, etc.), receive a **JWT**, and access a **protected product page** that streams ideas from the FastAPI backend. The backend verifies the JWT on **every request**.

By the end of this stage, only authenticated users can access the idea generator, and your app will be production-ready for real users.

## 🧭 What You’ll Build

An authenticated version of your app that:

* Requires users to **sign in** before accessing the generator
* Supports **Google, GitHub, and Email** providers
* Passes a **secure JWT** from the frontend to the backend
* **Verifies identity** on every `/api` request using Clerk JWKS
* Works seamlessly with **Next.js Pages Router**

## ✅ Prerequisites

* Completed the previous stage (working Business Idea Generator)
* Project deployed to **Vercel**

## ⚠️ Important Note (Timeouts)

If your app takes **> 60 seconds** to respond, you might see a **403** in the browser console (timeout).
A community fix is documented in: `community_contributions/jwt_token_60s_fix.md`.
If you hit the 60s timeout, apply that fix.

## 🧑‍💻 Part 1: User Authentication

### Step 1: Create Your Clerk Account

1. Visit clerk.com and click **Sign Up**
2. Create your account (Google or preferred method)
3. Create an **Application** (or click “Create Application” if returning)

### Step 2: Configure Your Clerk Application

1. **Application name:** LLMOps Business Idea Generator
2. **Sign-in options:** enable

   * Email
   * Google
   * GitHub
   * Apple (optional)
3. Click **Create Application**
   You’ll land on the dashboard with API keys.

### Step 3: Install Dependencies

Clerk SDK:

```bash
npm install @clerk/nextjs
```

Authenticated streaming helper:

```bash
npm install @microsoft/fetch-event-source
```

### Step 4: Configure Environment Variables (Local)

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
```

Copy these from the Clerk dashboard (Configure → API Keys).

Add to `.gitignore`:

```
.env.local
```

### Step 5: Wrap the App with Clerk

Update `pages/_app.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
```

### Step 6: Create the Protected Product Page

Create `pages/product.tsx`:

```typescript
"use client"

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useAuth } from '@clerk/nextjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export default function Product() {
    const { getToken } = useAuth();
    const [idea, setIdea] = useState<string>('…loading');

    useEffect(() => {
        let buffer = '';
        (async () => {
            const jwt = await getToken();
            if (!jwt) {
                setIdea('Authentication required');
                return;
            }
            
            await fetchEventSource('/api', {
                headers: { Authorization: `Bearer ${jwt}` },
                onmessage(ev) {
                    buffer += ev.data;
                    setIdea(buffer);
                },
                onerror(err) {
                    console.error('SSE error:', err);
                    // Don't throw - let it retry
                }
            });
        })();
    }, []); // Empty dependency array - run once on mount

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Business Idea Generator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        AI-powered innovation at your fingertips
                    </p>
                </header>

                {/* Content Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
                        {idea === '…loading' ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-pulse text-gray-400">
                                    Generating your business idea...
                                </div>
                            </div>
                        ) : (
                            <div className="markdown-content text-gray-700 dark:text-gray-300">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                >
                                    {idea}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
```

### Step 7: Update the Landing Page with Sign-In

Update `pages/index.tsx`:

```typescript
"use client"

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            IdeaGen
          </h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center py-24">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Generate Your Next
            <br />
            Big Business Idea
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
          </p>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Get Started Free
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Generate Ideas Now
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
```

### Step 8: Configure Backend Authentication (JWKS)

In Clerk Dashboard:

1. Configure → **API Keys**
2. Copy your **JWKS URL**

Add to `.env.local`:

```bash
CLERK_JWKS_URL=your_jwks_url_here
```

**What is JWKS?**
The **JSON Web Key Set** is a public endpoint containing Clerk’s public keys. When Clerk issues a JWT, your backend verifies its signature using those keys, confirming authenticity **without contacting Clerk per request**.

### Step 9: Update Backend Dependencies

`requirements.txt`:

```
fastapi
uvicorn
openai
fastapi-clerk-auth
```

### Step 10: Secure the API with Clerk

Replace `api/index.py`:

```python
import os
from fastapi import FastAPI, Depends  # type: ignore
from fastapi.responses import StreamingResponse  # type: ignore
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()

clerk_config = ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL"))
clerk_guard = ClerkHTTPBearer(clerk_config)

@app.get("/api")
def idea(creds: HTTPAuthorizationCredentials = Depends(clerk_guard)):
    user_id = creds.decoded["sub"]  # User ID from JWT - available for future use
    # We now know which user is making the request! 
    # You could use user_id to:
    # - Track usage per user
    # - Store generated ideas in a database
    # - Apply user-specific limits or customization
    
    client = OpenAI()
    prompt = [{"role": "user", "content": "Reply with a new business idea for AI Agents, formatted with headings, sub-headings and bullet points"}]
    stream = client.chat.completions.create(model="gpt-5-nano", messages=prompt, stream=True)

    def event_stream():
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                lines = text.split("\n")
                for line in lines[:-1]:
                    yield f"data: {line}\n\n"
                    yield "data:  \n"
                yield f"data: {lines[-1]}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

### Step 11: Add Env Vars to Vercel

```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add CLERK_JWKS_URL
```

Paste the values and select all environments.

### Step 12: Test Locally

```bash
vercel dev
```

Note: the Python backend won’t run under `vercel dev`, but authentication will.
Open `http://localhost:3000`, sign in, and navigate to **Go to App** to confirm the UI flow.

### Step 13: Deploy to Production

```bash
vercel --prod
```

## ✅ Completion Checklist

| Component               | Description                                           | Status |
| ----------------------- | ----------------------------------------------------- | :----: |
| Clerk SDK Installed     | `@clerk/nextjs` configured with provider              |    ✅   |
| Auth Landing Page       | `index.tsx` with sign-in/sign-out and user menu       |    ✅   |
| Protected Product Page  | `product.tsx` streams ideas with JWT-secured requests |    ✅   |
| Backend Auth Guard      | FastAPI uses Clerk JWKS to verify JWTs                |    ✅   |
| Env Vars (Local/Vercel) | Publishable key, secret key, JWKS URL                 |    ✅   |
| Production Deployment   | App deployed with authentication                      |    ✅   |

## 🧭 Next Stage Preview → `05_user_subscription`

Next, you’ll add **user subscriptions**:

* Upgrade to **paid tiers**
* Monthly pricing, plus **discounted annual commitment**
* Feature gating and usage limits per plan
* Clean upgrade/downgrade flows integrated with authentication
