const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = '/api/proxy';

export async function callClaude(prompt: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to call API: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function analyzeKnowYourself(
  theme: string,
  answers: Array<{ question: string; answer: string }>
): Promise<string> {
  const answersText = answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
    .join('\n\n');

  const prompt = `You are a psychology mirror for teenagers. A user chose the theme "${theme}" and answered these questions:

${answersText}

Give them an insight about themselves. Rules:
- Pattern name: 2-3 plain words max, starting with "The". Should feel like a personality type a friend would recognize, not a diagnosis. Examples: "The Overthinker", "The People Pleaser", "The Avoider", "The Deflector", "The Fixer"
- 2-3 sentences only. No more.
- Write like a smart friend who just gets it, not a therapist
- - Draw conclusions from their answers but NEVER mention or repeat what they said
- Never reference the questions or scenarios they answered
- Just state the truth about who they are, as if you already knew
- Be honest and a little uncomfortable but never mean
- Zero idioms, zero cheesy phrases, zero dramatic metaphors
- End on a quiet truth, not a punchline or motivation quote
- Use "you" throughout`;

  return callClaude(prompt);
}

export async function analyzeRealityCheck(
  situation: string,
  action: string
): Promise<string> {
  const prompt = `You are a psychology mirror for teenagers. A user shared this:

What happened: ${situation}

What they did: ${action}

Respond in this exact format:

**[Pattern name: 2-3 plain words starting with "The". Examples: "The Avoider", "The People Pleaser", "The Deflector"]**

**Verdict:** [healthy / partially distorted / distorted]

[2-3 sentences. Write like a smart friend, not a therapist. Be specific to what they described. Honest and a little uncomfortable but never mean. Zero idioms or cheesy phrases. Use "you" throughout.]`;

  return callClaude(prompt);
}

export async function suggestAlternative(
  situation: string,
  action: string,
  analysis: string
): Promise<string> {
  const prompt = `A user was in this situation:

What happened: ${situation}
What they did: ${action}
Analysis: ${analysis}

In 2 sentences, tell them one specific thing they could have done differently. Sound like a friend giving real advice, not a life coach. No preaching. Start with "You could have..." or "Next time...".`;

  return callClaude(prompt);
}