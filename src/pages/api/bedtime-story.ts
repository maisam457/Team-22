import type { NextApiRequest, NextApiResponse } from "next";
import { generateBedtimeStory } from "@/lib/bedtimeStory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const story = await generateBedtimeStory(prompt);
    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate story" });
  }
}
