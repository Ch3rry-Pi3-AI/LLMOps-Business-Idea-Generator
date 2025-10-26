# -------------------------------------------------------------------
# 🚀 LLMOps Business Idea Generator – FastAPI Application (Streaming)
# -------------------------------------------------------------------
"""
This module defines the FastAPI backend for the LLMOps Business Idea Generator
with **real-time response streaming** enabled.

Unlike the previous version, which returned a full text response only after
completion, this version streams partial output tokens from the OpenAI model
as they are generated. This allows the frontend to display the idea in
real time, improving responsiveness and user experience.

Notes
-----
- Uses `StreamingResponse` to send incremental data chunks.
- Implements an event stream (SSE-compatible) for live updates.
- Uses the lightweight `gpt-5-nano` model for fast token generation.
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
    title="LLMOps Business Idea Generator – Streaming",
    description="FastAPI backend streaming real-time business ideas from OpenAI.",
    version="0.2.0",
)


# -------------------------------------------------------------------
# 💡 Business Idea Streaming Endpoint
# -------------------------------------------------------------------
@app.get("/api")
def idea():
    """
    Generate a new business idea and stream it token-by-token to the client.

    This endpoint connects to the OpenAI API with streaming enabled and
    sends each chunk of text as it arrives. The frontend can subscribe to
    this stream using `EventSource` or similar browser APIs to render text
    in real time.

    Returns
    -------
    StreamingResponse
        A continuous text/event-stream containing partial model outputs.
    """
    # Instantiate OpenAI client
    client = OpenAI()

    # Define the user prompt for idea generation
    prompt = [
        {"role": "user", "content": "Come up with a new business idea for AI Agents"}
    ]

    # Create a streaming chat completion request
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
        Generator that yields incremental text updates as SSE-compatible events.
        """
        for chunk in stream:
            # Extract partial text from the streamed response
            text = chunk.choices[0].delta.content
            if text:
                # Split text into lines and yield as event chunks
                lines = text.split("\n")
                for line in lines:
                    yield f"data: {line}\n"
                yield "\n"

    # Return a streaming response with the correct media type
    return StreamingResponse(event_stream(), media_type="text/event-stream")