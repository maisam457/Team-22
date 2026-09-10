import sys
import os
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding='utf-8')
from openai import OpenAI

load_dotenv()

# Read and extract post contents from mockPosts.ts
post_contents = []
with open("src/data/mockPosts.ts", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if line.startswith("content:"):
            # Extract the string between single quotes
            start = line.find("'") + 1
            end = line.rfind("'")
            if start > 0 and end > start:
                post_contents.append(line[start:end])

# Combine all post contents into one prompt
prompt = " ".join(post_contents)
prompt = f"Using these posts generate a newsletter about what Team Impact (an org that matches kids with chronic illnesses to college sports teams) has done the past month; make it cute lots and lots of emojis. also make it brief and comprehensive. \n{prompt}"

# Get API key from environment variable for security
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("Error: OPENAI_API_KEY environment variable not set")
    sys.exit(1)

client = OpenAI(api_key=api_key)

# Use the correct OpenAI API
response = client.chat.completions.create(
    model="gpt-4o-mini",  # or "gpt-4" for better quality
    messages=[
        {"role": "system", "content": "You are a friendly newsletter writer for Team IMPACT."},
        {"role": "user", "content": prompt}
    ],
    max_tokens=500,
    temperature=0.7
)

print(response.choices[0].message.content)
