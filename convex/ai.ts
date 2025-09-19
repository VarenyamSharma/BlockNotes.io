import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Action to summarize note content using the Gemini API.
 */
export const summarize = action({
  args: {
    content: v.string(),
  },
  handler: async (_, { content }) => {
    // 1. Get the API key from environment variables.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not set in the environment variables. Please add it to your Convex project configuration."
      );
    }

    // 2. Prepare the request to the Gemini API.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              // The prompt for the AI model.
              text: `Please provide a concise summary of the following note content:\n\n${content}`,
            },
          ],
        },
      ],
    };

    // 3. Make the API call.
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // 4. Handle errors from the API.
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to summarize note. API response: ${errorText}`);
    }

    // 5. Parse the response and return the summary.
    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("Could not extract summary from the API response.");
    }

    return summary;
  },
});
