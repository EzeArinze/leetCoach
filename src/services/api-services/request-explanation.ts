// import { api } from "../axios-instance"
import { useMutation } from "@tanstack/react-query";

// // Requesting explanation for the problem
// export const RequestExplanation = async (problem: string) => {
//   try {
//     const response = await api.post("/completions", {
//       model: "google/gemma-3-27b-it:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are the best summarizer and the best at Explainig complex and any other problems in the hole world,Explain the following leetcode problem do not provide answer jsut the explanation: ${problem}`,
//         },
//       ],
//     });

//     if (response.status !== 200) {
//       throw new Error("Failed to fetch explanation");
//     }

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching explanation:", error);
//     throw error;
//   }
// };

// export const useRequestExplanation = () => {
//   return useMutation({
//     mutationFn: RequestExplanation,
//   });
// };

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
          content: `You are the best summarizer and the best at Explainig complex and any other problems in the hole world,Explain the following leetcode problem do not provide answer jsut the explanation: ${problem}`,
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

export const useStreamExplanation = (onToken: (token: string) => void) => {
  return useMutation({
    mutationFn: (problem: string) => streamExplanation(problem, onToken),
  });
};
