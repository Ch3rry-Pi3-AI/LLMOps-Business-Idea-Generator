// -------------------------------------------------------------------
// 🚀 LLMOps Business Idea Generator – Next.js App Entry Point
// -------------------------------------------------------------------
/**
 * This module defines the custom App component used by Next.js
 * to initialise every page in the application.
 *
 * It serves as the global entry point where shared providers,
 * layouts, and styles are imported. In this setup, Tailwind CSS
 * is globally applied through `globals.css`.
 *
 * Notes
 * -----
 * - This file runs once for all routes.
 * - Ideal place to add global state, contexts, or theming later.
 */

import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import Tailwind and global styles


// -------------------------------------------------------------------
// ⚙️ Application Wrapper
// -------------------------------------------------------------------
export default function MyApp({ Component, pageProps }: AppProps) {
  /**
   * Render the active page component with its associated props.
   *
   * Parameters
   * ----------
   * Component : React.ComponentType
   *     The active page component (determined by route).
   * pageProps : Record<string, any>
   *     Props preloaded for the current page.
   *
   * Returns
   * -------
   * JSX.Element
   *     The rendered page with global styles applied.
   */
  return <Component {...pageProps} />;
}
