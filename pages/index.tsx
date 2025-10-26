// -------------------------------------------------------------------
// 🎨 LLMOps Business Idea Generator – Styled Streaming Frontend (03_styling)
// -------------------------------------------------------------------
/**
 * Homepage with **real-time streaming** and **polished UI**.
 *
 * Connects to the FastAPI `/api` endpoint via Server-Sent Events (SSE),
 * accumulates tokens as they arrive, and renders them as **Markdown**
 * using ReactMarkdown with GFM + soft line breaks.
 *
 * Notes
 * -----
 * - Uses a gradient page background with dark-mode variants.
 * - Card layout with rounded corners, blur, and soft shadow.
 * - `.markdown-content` styles are defined in `styles/globals.css`.
 */

"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';


// -------------------------------------------------------------------
// ⚙️ Component Definition
// -------------------------------------------------------------------
export default function Home() {
  /**
   * Render the streaming homepage with enhanced styling.
   *
   * Returns
   * -------
   * JSX.Element
   *     Styled layout that streams and renders a business idea live.
   */

  // Live idea buffer; initial loading placeholder
  const [idea, setIdea] = useState<string>('…loading');

  // -------------------------------------------------------------------
  // 🔄 Stream Listener – SSE connection to `/api`
  // -------------------------------------------------------------------
  useEffect(() => {
    const evt = new EventSource('/api');
    let buffer = '';

    // Append each SSE message to the buffer and re-render
    evt.onmessage = (e) => {
      buffer += e.data;
      setIdea(buffer);
    };

    // Close the stream on error to avoid leaks
    evt.onerror = () => {
      console.error('SSE error, closing');
      evt.close();
    };

    // Cleanup on unmount
    return () => {
      evt.close();
    };
  }, []);


  // -------------------------------------------------------------------
  // 🧭 Rendered Layout – Gradient shell, centered card, Markdown body
  // -------------------------------------------------------------------
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
              // Subtle loading state with pulse animation
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse text-gray-400">
                  Generating your business idea...
                </div>
              </div>
            ) : (
              // Markdown-rendered streaming content
              <div className="markdown-content text-gray-700 dark:text-gray-300">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
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
