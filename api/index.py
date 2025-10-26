# -------------------------------------------------------------------
# 🎨 LLMOps Business Idea Generator – FastAPI Application (Styled Output)
# -------------------------------------------------------------------
"""
This module defines the FastAPI backend for the LLMOps Business Idea Generator
with real-time streaming and structured Markdown formatting.

It extends the previous streaming version by prompting the OpenAI model to
return output formatted with **headings, subheadings, and bullet points**.
This prepares the data for enhanced presentation and professional styling
in the frontend as part of the `03_styling` branch.

Notes
-----
- Continues using `StreamingResponse` for live token streaming.
- Output is now Markdown-structured for improved readability and display.
- Fully compatible with the ReactMarkdown frontend component.
"""

# -------------------------------------------------------------------
# 📦 Imports
# -------------------------------------------------------------------
from fastapi import FastAPI  # type: ignore
from fastapi.responses import StreamingResponse  # type: ignore
from openai import OpenAI  # type: ignore


# -------------------------------------------------------------------
# ⚙️ Application Initialisation
# -------------------------------------------------------------------
app = FastAPI(
    title="LLMOps Business Idea Generator – Styled Streaming",
    description="FastAPI backend streaming structured, formatted business ideas.",
    version="0.3.0",
)


# -------------------------------------------------------------------
# 💡 Business Idea Streaming Endpoint (Markdown-Formatted)
# -------------------------------------------------------------------
@app.get("/api")
def idea():
    """
    Stream a new business idea with structured Markdown formatting.

    This endpoint connects to the OpenAI API and streams a formatted
    business idea response. The model is prompted to include headings,
    subheadings, and bullet points for a polished visual presentation
    in the frontend.

    Returns
    -------
    StreamingResponse
        A continuous text/event-stream containing Markdown-formatted output.
    """
    # Instantiate OpenAI client
    client = OpenAI()

    # Define prompt to produce structured Markdown output
    prompt = [
        {
            "role": "user",
            "content": (
                "Reply with a new business idea for AI Agents, formatted with "
                "headings, sub-headings and bullet points."
            ),
        }
    ]

    # Request streaming chat completion
    stream = client.chat.completions.create(
        model="gpt-5-nano",
        messages=prompt,
        stream=True
    )

    # -------------------------------------------------------------------
    # 🔄 Generator Function – Stream Event Data
    # -------------------------------------------------------------------
    def event_stream():
        """
        Generator that yields incremental Markdown text chunks
        as SSE-compatible events for real-time frontend rendering.
        """
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                # Split into lines to handle Markdown line breaks cleanly
                lines = text.split("\n")
                for line in lines:
                    yield f"data: {line}\n"
                yield "\n"

    # Return the streaming response with appropriate media type
    return StreamingResponse(event_stream(), media_type="text/event-stream")
