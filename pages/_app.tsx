// -------------------------------------------------------------------
// 🔐 LLMOps Business Idea Generator – App Wrapper with Clerk Auth
// -------------------------------------------------------------------
/**
 * This file defines the global wrapper for all pages in the application.
 * It integrates **Clerk authentication** throughout the Next.js frontend,
 * enabling secure sign-in, sign-up, and session management.
 *
 * Notes
 * -----
 * - Uses `ClerkProvider` to provide authentication context to all pages.
 * - Automatically handles user sessions and redirects when necessary.
 * - Imports `globals.css` for consistent styling across the app.
 */

import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import '../styles/globals.css';


// -------------------------------------------------------------------
// ⚙️ Application Wrapper
// -------------------------------------------------------------------
export default function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Wrap the application with ClerkProvider to enable authentication
   * across all pages and components.
   *
   * Parameters
   * ----------
   * Component : React.ComponentType
   *     The active page component being rendered.
   * pageProps : Record<string, any>
   *     Props passed to the active page, including Clerk context.
   *
   * Returns
   * -------
   * JSX.Element
   *     The authenticated application layout.
   */
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
