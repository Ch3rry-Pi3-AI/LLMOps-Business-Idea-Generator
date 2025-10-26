// -------------------------------------------------------------------
// 💡 LLMOps Business Idea Generator – Real-Time Streaming Frontend
// -------------------------------------------------------------------
/**
 * This component defines the main homepage for the Business Idea Generator
 * with **real-time streaming output**.
 *
 * It connects to the FastAPI backend via Server-Sent Events (SSE),
 * receiving incremental tokens as the OpenAI model generates text.
 * The response is displayed dynamically using React state and Markdown rendering.
 *
 * Notes
 * -----
 * - Uses EventSource for SSE to stream text from the backend.
 * - Uses ReactMarkdown with GFM + soft line-breaks for rich formatting.
 * - Updates the UI continuously as new data arrives from the stream.
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
     * Render the homepage that receives and displays streamed AI output.
     *
     * Returns
     * -------
     * JSX.Element
     *     The main page layout rendering the real-time business idea.
     */

    // Initialise state for the streamed idea text
    const [idea, setIdea] = useState<string>('…loading');

    // -------------------------------------------------------------------
    // 🔄 Stream Listener – Connect to Backend via SSE
    // -------------------------------------------------------------------
    useEffect(() => {
        // Establish SSE connection to FastAPI endpoint
        const evt = new EventSource('/api');
        let buffer = '';

        // Handle each message chunk from the stream
        evt.onmessage = (e) => {
            buffer += e.data;
            setIdea(buffer); // Update live as text accumulates
        };

        // Handle errors gracefully and close the stream
        evt.onerror = () => {
            console.error('SSE error, closing');
            evt.close();
        };

        // Cleanup connection on component unmount
        return () => {
            evt.close();
        };
    }, []);


    // -------------------------------------------------------------------
    // 🧭 Rendered Layout
    // -------------------------------------------------------------------
    return (
        <main className="p-8 font-sans">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-4">
                Business Idea Generator
            </h1>

            {/* Streaming Output Container */}
            <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                    >
                        {idea}
                    </ReactMarkdown>
                </div>
            </div>
        </main>
    );
}
