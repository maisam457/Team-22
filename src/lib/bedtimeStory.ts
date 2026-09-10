import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBedtimeStory(prompt: string) {
  const response = await client.responses.create({
    model: "gpt-5", // Change to "gpt-3.5-turbo" if needed
    input: prompt,
  });
  return response.output_text;
}
