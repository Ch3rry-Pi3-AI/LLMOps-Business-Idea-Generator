// -------------------------------------------------------------------
// 💎 LLMOps Business Idea Generator – Product Page with Subscriptions
// -------------------------------------------------------------------
/**
 * Authenticated product page that **protects premium features** behind a
 * subscription paywall and streams AI-generated ideas in real time.
 *
 * Features
 * --------
 * - Clerk **Protect**: gates content by plan (e.g., `premium_subscription`).
 * - **PricingTable** fallback: shows upgrade options if user lacks access.
 * - **JWT-secured SSE**: fetches a streaming idea feed from FastAPI `/api`.
 * - **Markdown rendering**: uses ReactMarkdown with GFM + soft line breaks.
 * - **User menu**: top-right `UserButton` for account/profile actions.
 *
 * Notes
 * -----
 * - Requires Clerk to be configured in `_app.tsx` via `ClerkProvider`.
 * - `fetch-event-source` provides robust SSE with auto-retry semantics.
 * - The backend must validate JWTs using Clerk JWKS (see `api/index.py`).
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
// 💡 IdeaGenerator – Authenticated, streaming idea panel
// -------------------------------------------------------------------
function IdeaGenerator() {
  /**
   * Render the premium idea generator and stream live Markdown output.
   *
   * Returns
   * -------
   * JSX.Element
   *     A styled card that displays an AI-generated business idea, streamed
   *     incrementally from the backend and rendered as Markdown.
   */

  // Obtain helper for retrieving a Clerk-issued JWT for secure API calls
  const { getToken } = useAuth();

  // Local buffer for streaming content (shown in the UI as it arrives)
  const [idea, setIdea] = useState<string>('…loading');

  // -------------------------------------------------------------------
  // 🔄 Establish an authenticated SSE stream to `/api`
  // -------------------------------------------------------------------
  useEffect(() => {
    // Accumulate incremental chunks before committing to state
    let buffer = '';

    (async () => {
      // Get a fresh JWT from Clerk for the current session
      const jwt = await getToken();

      // If user is somehow unauthenticated, short-circuit with a message
      if (!jwt) {
        setIdea('Authentication required');
        return;
      }

      // Start a Server-Sent Events stream to the FastAPI backend
      await fetchEventSource('/api', {
        // Attach JWT for backend verification (Authorization: Bearer <token>)
        headers: { Authorization: `Bearer ${jwt}` },

        // On each message, append data to the buffer and re-render
        onmessage(ev) {
          buffer += ev.data;
          setIdea(buffer);
        },

        // On errors, log and allow the library to retry (if applicable)
        onerror(err) {
          console.error('SSE error:', err);
          // Do not throw; letting the client handle backoff/retry is preferred
        }
      });
    })();

    // No cleanup needed for fetch-event-source here; it manages its lifecycle
  }, []); // Run once on mount


  // -------------------------------------------------------------------
  // 🧭 UI – Header + streaming content card
  // -------------------------------------------------------------------
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Business Idea Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          AI-powered innovation at your fingertips
        </p>
      </header>

      {/* Streaming Content Card */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
          {idea === '…loading' ? (
            // Subtle loading animation while stream starts
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-gray-400">
                Generating your business idea...
              </div>
            </div>
          ) : (
            // Render streamed Markdown with sensible typography
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
// 🧾 Product – Page container with plan gating (Protect + PricingTable)
// -------------------------------------------------------------------
export default function Product() {
  /**
   * Wrap the premium content in a subscription gate.
   *
   * Returns
   * -------
   * JSX.Element
   *     A full-page layout that either shows:
   *     - The premium generator (if the user has the required plan), or
   *     - A PricingTable fallback prompting the user to upgrade.
   */

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top-right user menu (profile, sign-out, etc.) */}
      <div className="absolute top-4 right-4">
        <UserButton showName={true} />
      </div>

      {/* -----------------------------------------------------------------
         🔐 Plan Gating
         - `plan` should match the identifier you configure in Clerk Billing.
         - If the user lacks access, the `fallback` renders a pricing wall.
      ------------------------------------------------------------------ */}
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

            {/* Embedded pricing table powered by Clerk */}
            <div className="max-w-4xl mx-auto">
              <PricingTable />
            </div>
          </div>
        }
      >
        {/* Render the premium generator if the plan requirement is met */}
        <IdeaGenerator />
      </Protect>
    </main>
  );
}
