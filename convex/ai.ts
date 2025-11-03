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
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const requestBody = {
      model: "gemini-pro",  // Using gemini-pro instead of gemini-2.5-flash for better reliability
      contents: [{
        parts: [{
          text: `Summarize the following content in 2-3 short sentences:\n\n${content}\n\nKeep the summary under 100 words.`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
        topK: 40,
        topP: 0.95
      }
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
    
    // Detailed debug logging
    console.log("Full API Response:", JSON.stringify(data, null, 2));

    if (!data) {
      throw new Error("Empty response from API");
    }

    // Check for API error messages
    if (data.error) {
      throw new Error(`API Error: ${data.error.message}`);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No candidates in the API response");
    }

    const candidate = data.candidates[0];
    console.log("First candidate:", JSON.stringify(candidate, null, 2));

    if (candidate.finishReason === "MAX_TOKENS") {
      console.log("Warning: Response was truncated due to max tokens limit");
    }

    const candidateContent = candidate.content;
    if (!candidateContent) {
      throw new Error("No content in candidate response");
    }

    // Extract text from content
    let text = "";
    if (candidateContent.parts && candidateContent.parts.length > 0) {
      text = candidateContent.parts[0].text;
    }

    if (!text) {
      throw new Error(`No text found in response. Full candidate structure: ${JSON.stringify(candidate)}`);
    }

    return text.trim();
  },
});
