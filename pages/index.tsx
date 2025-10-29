// -------------------------------------------------------------------
// 🧭 LLMOps Business Idea Generator – Next.js Home Page (Clerk)
// -------------------------------------------------------------------
/**
 * Home page for IdeaGen Pro.
 *
 * This component renders:
 * - A navigation bar that conditionally shows "Sign In" (when signed out)
 *   or "Go to App" + <UserButton /> (when signed in).
 * - A hero section with headline, subheadline, and a pricing preview card.
 * - A call-to-action area that conditionally renders:
 *   - "Start Your Free Trial" (when signed out)
 *   - "Access Premium Features" (when signed in)
 *
 * Notes
 * -----
 * - Built with Next.js App Router ("use client" component).
 * - Uses Clerk <SignedIn>, <SignedOut>, <SignInButton>, and <UserButton>.
 * - Styling via Tailwind CSS; no behavioural logic modified.
 */

"use client";

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    // Full-height gradient background, light/dark compatible
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* ------------------------------------------------------------- */}
        {/* 🧭 Navigation */}
        {/* - Left: App title
            - Right: Auth-aware actions (Sign In OR Go to App + User menu) */}
        {/* ------------------------------------------------------------- */}
        <nav className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            IdeaGen Pro
          </h1>
          <div>
            {/* Show Sign In when the user is signed out */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Show App link + UserButton when the user is signed in */}
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link 
                  href="/product" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                {/* Clerk user dropdown with name */}
                <UserButton showName={true} />
              </div>
            </SignedIn>
          </div>
        </nav>

        {/* ------------------------------------------------------------- */}
        {/* 🎯 Hero Section */}
        {/* - Headline, subheadline, and pricing preview */}
        {/* ------------------------------------------------------------- */}
        <div className="text-center py-24">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Generate Your Next
            <br />
            Big Business Idea
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Harness the power of AI to discover innovative business opportunities tailored for the AI agent economy
          </p>
          
          {/* ----------------------------------------------------------- */}
          {/* 💎 Pricing Preview */}
          {/* - Simple plan teaser; not interactive */}
          {/* ----------------------------------------------------------- */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 max-w-sm mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-2">Premium Subscription</h3>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              $10
              <span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="text-left text-gray-600 dark:text-gray-400 mb-6">
              <li className="mb-2">✓ Unlimited idea generation</li>
              <li className="mb-2">✓ Advanced AI models</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
          </div>
          
          {/* ----------------------------------------------------------- */}
          {/* 🚪 Auth-Aware CTA Buttons */}
          {/* - SignedOut => "Start Your Free Trial" (opens Clerk modal)
              - SignedIn  => "Access Premium Features" (links to /product) */}
          {/* ----------------------------------------------------------- */}
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
