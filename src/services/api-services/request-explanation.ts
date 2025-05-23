import { useMutation } from "@tanstack/react-query";

export const streamExplanation = async (
  problem: string,
  onToken: (token: string) => void
) => {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_LEET_COACH_API_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemma-3-27b-it:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: `You are the best summarizer and the best at Explainig complex leetcode and any other problems in the hole world, Explain the following leetcode problem do not provide answer jsut the explanation, make it concise and understandable, we don't want to be reading a lot of things and provide a little example: ${problem}`,
        },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error("Streaming failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    //check if the stream is done then break and save the data to our database if we want to
    // if (done && value) {
    //   const data = decoder.decode(value);
    //   console.log("Stream done", data);
    //   break;}
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.replace("data: ", "").trim();
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const token = parsed.choices?.[0]?.delta?.content;
          if (token) onToken(token);
        } catch (e) {
          console.error("Parse error", e);
        }
      }
    }
  }
};

export const useStreamExplanation = (onToken: (token: string) => void) => {
  return useMutation({
    mutationFn: (problem: string) => streamExplanation(problem, onToken),
  });
};
