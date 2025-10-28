// -------------------------------------------------------------------
// 💎 LLMOps Business Idea Generator – Product Page (Authenticated + Subscriptions)
// -------------------------------------------------------------------
/**
 * This file defines the **authenticated product page** for the Business Idea Generator.
 * It integrates **user authentication** (via Clerk), **plan-based access control**, and
 * **real-time idea streaming** with a professional UI.
 *
 * Features
 * --------
 * - Clerk-based authentication and plan protection (`Protect` component)
 * - Dynamic pricing display for unsubscribed users (`PricingTable`)
 * - Live Server-Sent Events (SSE) connection to FastAPI backend
 * - Markdown-rendered ideas with support for GFM and soft line breaks
 * - Responsive, dark-mode compatible Tailwind layout
 *
 * Notes
 * -----
 * - Requires Clerk configuration in `_app.tsx` with `ClerkProvider`
 * - The backend endpoint `/api` must validate JWTs via Clerk JWKS
 * - The plan name (`premium_subscription`) should match your Clerk setup
 */

"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useAuth } from '@clerk/nextjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Protect, PricingTable, UserButton } from '@clerk/nextjs';


// -------------------------------------------------------------------
// 💡 IdeaGenerator – Authenticated, Streaming Idea Component
// -------------------------------------------------------------------
function IdeaGenerator() {
  /**
   * Streams AI-generated business ideas in real time via an authenticated
   * connection to the FastAPI backend.
   *
   * Returns
   * -------
   * JSX.Element
   *     The rendered streaming idea section including header, card, and Markdown output.
   */

  // Retrieve Clerk-issued JWT for secure backend communication
  const { getToken } = useAuth();

  // State variable to store the currently streamed business idea
  const [idea, setIdea] = useState<string>('…loading');

  // -------------------------------------------------------------------
  // 🔄 Establish authenticated SSE connection to backend
  // -------------------------------------------------------------------
  useEffect(() => {
    // Local buffer to accumulate incoming text chunks
    let buffer = '';

    (async () => {
      // Request the user's JWT token from Clerk
      const jwt = await getToken();

      // If user is unauthenticated, show message and exit early
      if (!jwt) {
        setIdea('Authentication required');
        return;
      }

      // Open a live event stream to the FastAPI `/api` endpoint
      await fetchEventSource('/api', {
        // Send the JWT in the Authorization header
        headers: { Authorization: `Bearer ${jwt}` },

        // On each streamed chunk, append it to buffer and update the display
        onmessage(ev) {
          buffer += ev.data;
          setIdea(buffer);
        },

        // Handle errors gracefully — do not throw, allow auto-retry
        onerror(err) {
          console.error('SSE error:', err);
        }
      });
    })();

    // Empty dependency array ensures this runs only once on mount
  }, []);


  // -------------------------------------------------------------------
  // 🧭 Render – Header + Markdown Idea Display
  // -------------------------------------------------------------------
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

      {/* Streaming Idea Card */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
          {idea === '…loading' ? (
            // Loading placeholder while waiting for AI response
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-gray-400">
                Generating your business idea...
              </div>
            </div>
          ) : (
            // Render streamed idea as formatted Markdown
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


// -------------------------------------------------------------------
// 🧾 Product – Page Container with Authentication & Plan Gating
// -------------------------------------------------------------------
export default function Product() {
  /**
   * Renders the main product page.
   * Uses Clerk’s `Protect` to restrict access to paying users and display
   * upgrade options for free-tier accounts.
   *
   * Returns
   * -------
   * JSX.Element
   *     The full page layout with user profile access, protected generator,
   *     and pricing table fallback.
   */

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* -------------------------------------------------------------------
         👤 User Profile Button
         Displays the signed-in user’s avatar and name in the top-right corner.
      -------------------------------------------------------------------- */}
      <div className="absolute top-4 right-4">
        <UserButton showName={true} />
      </div>

      {/* -------------------------------------------------------------------
         🔐 Subscription Gating via Clerk Protect
         Restricts access based on the plan specified below.
         If user lacks access, fallback displays upgrade options.
      -------------------------------------------------------------------- */}
      <Protect
        plan="premium_subscription"
        fallback={
          <div className="container mx-auto px-4 py-12">
            {/* Fallback Header */}
            <header className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Choose Your Plan
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Unlock unlimited AI-powered business ideas
              </p>
            </header>

            {/* Pricing Table for Plan Upgrades */}
            <div className="max-w-4xl mx-auto">
              <PricingTable />
            </div>
          </div>
        }
      >
        {/* -------------------------------------------------------------------
           🧠 Idea Generator (Rendered only for subscribed users)
        -------------------------------------------------------------------- */}
        <IdeaGenerator />
      </Protect>
    </main>
  );
}
