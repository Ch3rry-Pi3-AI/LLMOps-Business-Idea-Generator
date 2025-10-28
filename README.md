# 🚀 LLMOps – Business Idea Generator

### 💳 User Subscriptions Branch (`05_user_subscription`)

This stage adds **paid subscriptions** using **Clerk Billing**.
Users can view pricing, purchase a **Premium Subscription**, and unlock the **plan-gated generator**. The **Product** page stays protected by Clerk’s plan checks, while payments and subscription management are handled by Clerk (with optional Stripe integration).

By the end of this stage, your app supports **monthly pricing** and an **optional discounted annual plan**, complete with upgrade flows and automatic access control.

## 🧭 What You’ll Build

A subscription-enabled SaaS that:

* Shows a **pricing wall** to non-subscribed users
* Gates premium features using **`<Protect plan="premium_subscription">`**
* Unlocks the generator immediately after purchase
* Lets users **manage subscriptions** via the Clerk **UserButton**
* Works seamlessly with the **Next.js Pages Router** and your existing **FastAPI** backend

## ✅ Prerequisites

* `04_user_authentication` completed and deployed (Clerk sign-in working)
* Your app live on **Vercel**

## ⚠️ Note on API timeouts

If your app takes **> 60 seconds** to respond, you might see a **403** in the browser console.
A community fix is documented in `community_contributions/jwt_token_60s_fix.md`. Apply it if you encounter this timeout.

## Step 1: Enable Clerk Billing

1. Open the [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your **SaaS** application
3. Click **Configure** (top navigation)
4. Click **Subscription Plans** (left sidebar)
5. Click **Get Started** if prompted
6. Click **Enable Billing** and accept terms (if prompted)

You should now see the **Subscription Plans** page.

## Step 2: Create Your Subscription Plan

1. Click **Create Plan**
2. Configure the plan:

   * **Name:** Premium Subscription
   * **Key:** `premium_subscription`  ← use this exact key
   * **Price:** $10.00 monthly (or your preferred price)
   * **Description:** Unlimited AI-powered business ideas
3. Optional annual discount:

   * Toggle **Annual billing** on
   * Set the annual price (e.g., **$100/year**)
4. Click **Save**

After saving, note the **Plan ID** shown in the plan card (e.g., `plan_…`). In production, Clerk manages the flow automatically, but the ID is useful for testing.

## Step 3: Update Your Product Page (Plan Gating + Streaming)

Protect your product route with **Clerk Protect** and show a **PricingTable** when the user isn’t subscribed.

`pages/product.tsx`:

```typescript
"use client"

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useAuth } from '@clerk/nextjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';

function IdeaGenerator() {
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
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                {idea}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Product() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            {/* User Menu in Top Right */}
            <div className="absolute top-4 right-4">
                <UserButton showName={true} />
            </div>

            {/* Subscription Protection */}
            <Protect
                plan="premium_subscription"
                fallback={
                    <div className="container mx-auto px-4 py-12">
                        <header className="text-center mb-12">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                                Choose Your Plan
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                                Unlock unlimited AI-powered business ideas
                            </p>
                        </header>
                        <div className="max-w-4xl mx-auto">
                            <PricingTable />
                        </div>
                    </div>
                }
            >
                <IdeaGenerator />
            </Protect>
        </main>
    );
}
```

## Step 4: Update Your Landing Page (Pricing Preview)

Add a light pricing preview and keep the sign-in CTA.

`pages/index.tsx`:

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
            IdeaGen Pro
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
                <UserButton showName={true} />
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
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
          </p>

          {/* Pricing Preview */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 max-w-sm mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">Premium Subscription</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              $10<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="text-left text-gray-600 dark:text-gray-400 mb-6">
              <li className="mb-2">✓ Unlimited idea generation</li>
              <li className="mb-2">✓ Advanced AI models</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Start Your Free Trial
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/product">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all transform hover:scale-105">
                Access Premium Features
              </button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
```

## Step 5: Configure Billing Provider (Optional)

Clerk includes a **zero-config payment gateway** suitable for testing:

1. Clerk Dashboard → **Configure** → **Billing** → **Settings**
2. Default: **Clerk payment gateway**
   Works immediately for test payments
3. Optional: Switch to **Stripe**

   * Select **Stripe**
   * Follow the Clerk setup wizard to connect your Stripe account

Tip: The built-in Clerk gateway is perfect for development and demos.

## Step 6: Test Your Subscription Flow

Deploy:

```bash
vercel --prod
```

Then:

1. Visit your production URL
2. Sign in (or create a new account)
3. Go to **Product** (or **Access Premium Features**)
4. If unsubscribed, you’ll see the **PricingTable**
5. Click **Subscribe**
6. In test mode, Clerk can simulate the subscription if no provider is connected
7. After subscribing, the **Idea Generator** unlocks automatically

### Managing Subscriptions

Users can manage subscriptions via the **UserButton**:

1. Click the profile avatar
2. Choose **Manage account**
3. Open **Subscriptions** to view or cancel

## What’s Happening Behind the Scenes

* **Clerk Protect** gates the page by **plan key** (`premium_subscription`)
* **PricingTable** renders when the user lacks access
* Clerk handles **checkout** and **subscription state**
* Your **JWT-secured** FastAPI `/api` route continues to verify tokens on each request

## Architecture Overview

1. User navigates to `/product`
2. Clerk checks plan access via `<Protect plan="premium_subscription">`
3. If no plan → show `PricingTable`
4. If subscribed → render `IdeaGenerator`
5. Payments → processed by Clerk (or Stripe, if configured)
6. Subscription management → via the Clerk **UserButton** UI

## Troubleshooting

**“Plan not found”**

* The plan key must be exactly `premium_subscription`
* Ensure **Billing** is enabled in the Clerk Dashboard
* Confirm the plan is **active** (not archived)

**Pricing table not showing**

* Clear browser cache and cookies
* Update `@clerk/nextjs` to the latest version
* Verify Billing is enabled on your Clerk app

**Always seeing the pricing table after subscribing**

* Check the user’s subscription status in Clerk Dashboard
* Verify the plan key matches exactly
* Sign out and sign back in to refresh state

**Payment not working**

* Normal in test mode without a provider
* Clerk will simulate subscriptions
* For real payments, connect **Stripe** in Billing Settings

## ✅ Completion Checklist

| Component            | Description                                              | Status |
| -------------------- | -------------------------------------------------------- | :----: |
| Billing Enabled      | Clerk Billing turned on with at least one active plan    |    ✅   |
| Plan Key             | `premium_subscription` created and active                |    ✅   |
| Product Page Gated   | `<Protect plan="premium_subscription">` in `product.tsx` |    ✅   |
| Pricing Fallback     | `PricingTable` renders for non-subscribers               |    ✅   |
| Streaming + JWT      | SSE streaming continues with Clerk JWT verification      |    ✅   |
| Landing Page Updated | Pricing preview + CTAs integrated                        |    ✅   |
| Deployment           | Production build deployed on Vercel                      |    ✅   |