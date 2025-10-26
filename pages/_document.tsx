// -------------------------------------------------------------------
// 🧱 LLMOps Business Idea Generator – Custom Document
// -------------------------------------------------------------------
/**
 * This module defines a custom Document for the Next.js application.
 *
 * It extends the default HTML structure rendered on the server side,
 * allowing you to customise metadata, language settings, and document-level
 * attributes that wrap all pages in the app.
 *
 * Notes
 * -----
 * - The `<Head>` here is server-rendered (different from next/head).
 * - Use this file for metadata or links that should appear on every page.
 */

import { Html, Head, Main, NextScript } from 'next/document';


// -------------------------------------------------------------------
// 🧩 Document Structure Definition
// -------------------------------------------------------------------
export default function Document() {
  /**
   * Render the base HTML document structure for the app.
   *
   * Returns
   * -------
   * JSX.Element
   *     The root HTML layout containing the <head> metadata,
   *     <Main> content container, and Next.js runtime scripts.
   */
  return (
    <Html lang="en">
      <Head>
        {/* Application metadata and global tags */}
        <title>Business Idea Generator</title>
        <meta name="description" content="AI-powered business idea generation" />
      </Head>

      <body>
        {/* Main application content */}
        <Main />

        {/* Next.js runtime scripts and hydration logic */}
        <NextScript />
      </body>
    </Html>
  );
}
