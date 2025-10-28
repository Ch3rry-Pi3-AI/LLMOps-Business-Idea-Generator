// -------------------------------------------------------------------
// 🔐 LLMOps Business Idea Generator – Authenticated Homepage
// -------------------------------------------------------------------
/**
 * The main homepage for the LLMOps Business Idea Generator.
 *
 * This version introduces **user authentication** via Clerk,
 * allowing users to sign in, sign out, or access the app securely.
 *
 * Notes
 * -----
 * - Uses Clerk components: `SignInButton`, `SignedIn`, `SignedOut`, and `UserButton`.
 * - Unauthenticated users see a "Sign In" or "Get Started Free" button.
 * - Authenticated users can navigate directly to the product dashboard.
 * - Maintains the professional gradient-based design introduced in `03_styling`.
 */

"use client";

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


// -------------------------------------------------------------------
// ⚙️ Component Definition
// -------------------------------------------------------------------
export default function Home() {
  /**
   * Render the homepage with authentication-based content.
   *
   * Returns
   * -------
   * JSX.Element
   *     The home layout featuring a hero section and navigation bar.
   */
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        
        {/* -------------------------------------------------------------------
           🧭 Navigation Bar – Displays brand and user authentication actions
        ------------------------------------------------------------------- */}
        <nav className="flex justify-between items-center mb-12">
          {/* Brand Title */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            IdeaGen
          </h1>

          {/* Authentication Controls */}
          <div>
            {/* Shown only to signed-out users */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Shown only to signed-in users */}
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link
                  href="/product"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to App
                </Link>
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </nav>


        {/* -------------------------------------------------------------------
           🌟 Hero Section – Introduces the product and encourages interaction
        ------------------------------------------------------------------- */}
        <div className="text-center py-24">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Generate Your Next
            <br />
            Big Business Idea
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Harness the power of AI to discover innovative business opportunities
            tailored for the AI agent economy.
          </p>

          {/* Conditional Hero Buttons */}
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
