// import { useMutation } from "@tanstack/react-query";
// import { api } from "../axios-instance";

import { useMutation } from "@tanstack/react-query";

// export const RequestTips = async (problem: string) => {
//   const response = await api.post("/completions", {
//     model: "deepseek/deepseek-r1:free",
//     messages: [
//       {
//         role: "user",
//         content: `You are the best summarizer and the best at giving tips in the hole world, Give me some tips for the following leetcode problem. Do not provide an answer, just the tips: ${problem}`,
//       },
//     ],
//   });

//   if (response.status !== 200) {
//     throw new Error("Failed to fetch tips");
//   }

//   return response.data.choices[0].message.content;
// };

// export const useRequestTips = () => {
//   return useMutation({
//     mutationFn: RequestTips,
//   });
// };

// streamTips.ts
export const streamTips = async (
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
      model: "deepseek/deepseek-r1:free",
      stream: true,
      messages: [
        {
          role: "user",
          content: `You are the best summarizer and the best at giving tips to complex and any other problems in the hole world,Give me tips the following LeetCode problem without solving it: ${problem}`,
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

export const useStreamTips = (onToken: (token: string) => void) => {
  return useMutation({
    mutationFn: (problem: string) => streamTips(problem, onToken),
  });
};
