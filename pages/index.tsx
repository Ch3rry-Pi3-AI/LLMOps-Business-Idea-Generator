// -------------------------------------------------------------------
// 💡 LLMOps Business Idea Generator – Homepage
// -------------------------------------------------------------------
/**
 * This component defines the main homepage for the LLMOps Business Idea Generator.
 *
 * Upon mounting, it fetches a new business idea from the FastAPI backend (`/api`)
 * and displays it dynamically in a styled container.
 *
 * Notes
 * -----
 * - Uses React hooks for state management (`useState`, `useEffect`).
 * - Fetches data client-side for live updates during development.
 * - Can be extended with refresh, animation, or LLMOps analytics in later stages.
 */

"use client"; // Rendered on the client-side (in the browser), not on the server

import { useEffect, useState } from 'react';


// -------------------------------------------------------------------
// ⚙️ Component Definition
// -------------------------------------------------------------------
export default function Home() {
    /**
     * Render the homepage of the Business Idea Generator.
     *
     * Returns
     * -------
     * JSX.Element
     *     The main page layout displaying a dynamically fetched business idea.
     */

    // Initialise state with a loading placeholder
    const [idea, setIdea] = useState<string>('…loading');

    // Fetch business idea on component mount
    useEffect(() => {
        fetch('/api')
            .then(res => res.text())          // Parse text response from FastAPI
            .then(setIdea)                    // Update the displayed idea
            .catch(err => setIdea('Error: ' + err.message)); // Handle network errors gracefully
    }, []);


    // -------------------------------------------------------------------
    // 🧭 Rendered Layout
    // -------------------------------------------------------------------
    return (
        <main className="p-8 font-sans">
            {/* Page title */}
            <h1 className="text-3xl font-bold mb-4">
                Business Idea Generator
            </h1>

            {/* Idea display container */}
            <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {idea}
                </p>
            </div>
        </main>
    );
}
