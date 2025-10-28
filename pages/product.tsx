// -------------------------------------------------------------------
// 💡 LLMOps Business Idea Generator – Authenticated Product Page
// -------------------------------------------------------------------
/**
 * The main product interface for authenticated users.
 *
 * This page connects securely to the FastAPI backend using a Clerk-issued
 * JWT token, streams AI-generated ideas in real time, and renders them
 * with Markdown formatting.
 *
 * Notes
 * -----
 * - Requires authentication via Clerk (`useAuth` hook).
 * - Uses `fetch-event-source` for Server-Sent Events (SSE) streaming.
 * - Streams content incrementally from `/api`, updating as tokens arrive.
 * - Styled with Tailwind for responsive and modern presentation.
 */

"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useAuth } from '@clerk/nextjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';


// -------------------------------------------------------------------
// ⚙️ Component Definition
// -------------------------------------------------------------------
export default function Product() {
    /**
     * Render the authenticated product page and handle secure
     * streaming from the backend.
     *
     * Returns
     * -------
     * JSX.Element
     *     The full UI for authenticated users, including
     *     real-time idea streaming with Markdown rendering.
     */

    // Retrieve JWT token helper from Clerk
    const { getToken } = useAuth();

    // Local state to hold the streaming business idea text
    const [idea, setIdea] = useState<string>('…loading');

    // -------------------------------------------------------------------
    // 🔄 Streaming Logic – Fetch ideas from the FastAPI backend via SSE
    // -------------------------------------------------------------------
    useEffect(() => {
        let buffer = '';

        (async () => {
            // Get Clerk-issued JWT for authentication
            const jwt = await getToken();

            // If user is not authenticated, show message
            if (!jwt) {
                setIdea('Authentication required');
                return;
            }

            // Connect to FastAPI endpoint using authenticated SSE
            await fetchEventSource('/api', {
                headers: { Authorization: `Bearer ${jwt}` },
                onmessage(ev) {
                    buffer += ev.data;
                    setIdea(buffer);
                },
                onerror(err) {
                    console.error('SSE error:', err);
                    // Allow automatic retry behaviour
                }
            });
        })();
    }, []); // Run once on mount


    // -------------------------------------------------------------------
    // 🎨 UI Layout – Styled with Tailwind and dark mode support
    // -------------------------------------------------------------------
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">

                {/* ----------------------------------------------------------
                   🧭 Header Section – Title and subtitle
                ---------------------------------------------------------- */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Business Idea Generator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        AI-powered innovation at your fingertips
                    </p>
                </header>

                {/* ----------------------------------------------------------
                   📦 Content Card – Displays the streaming business idea
                ---------------------------------------------------------- */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-95">
                        {idea === '…loading' ? (
                            // Loading animation while waiting for stream
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-pulse text-gray-400">
                                    Generating your business idea...
                                </div>
                            </div>
                        ) : (
                            // Render live Markdown output as it streams
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
