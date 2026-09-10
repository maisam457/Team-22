import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run ai_thing.py from the project root
  exec("python ./ai/ai_thing.py", { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ newsletter: `AI generation failed.\n${stderr}` });
      return;
    }
    res.status(200).json({ newsletter: stdout });
  });
}
